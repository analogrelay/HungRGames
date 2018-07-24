import { IDisposable } from "../Interfaces/IDisposable";
import { EventHandler } from "../Utilities/EventHandler";
import { EventHandler1 } from "../Utilities/EventHandler1";
import { Vector2d } from "../Assets/Vectors/Vector2d";
import { NoopTripInvoker } from "../Utilities/NoopTripInvoker";

export module Input {

    /**
    * Defines an all around Input handler which manages gamepad, mouse and keyboard events.
    */
    export class InputManager implements IDisposable {
        /**
        * Used to bind functions to mouse related events.
        */
        public Mouse: MouseHandler;
        /**
        * Used to bind functions to keyboard related events.
        */
        public Keyboard: KeyboardHandler;
        /**
         * Used to bind functions to Gamepad related events.
         */
        public Gamepad: GamepadHandler;

        private _disposed: boolean;

        /**
        * Creates a new instance of the InputManager object.
        * @param target The object through which mouse events will be monitored on.
        */
        constructor(target: HTMLElement) {
            this._disposed = false;
            this.Mouse = new MouseHandler(target);
            this.Keyboard = new KeyboardHandler();
            this.Gamepad = new GamepadHandler();
        }

        /**
        * Disposes the MouseHandler and unbinds all bound events.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this.Mouse.Dispose();
                this.Keyboard.Dispose();
                this.Gamepad.Dispose();
            }
            else {
                throw new Error("InputManager cannot be disposed more than once");
            }
        }
    }

    /**
     * Defines a handler that will monitor gamepad events
     */
    export class GamepadHandler implements IDisposable {

        private _gamepadAPI: GamepadAPI;

        // @ts-ignore
        private _disposed: boolean;

        /**
        * Creates a new instance of the GamepadHandler object.
        */
        constructor() {
            this._gamepadAPI = new GamepadAPI();
            this._disposed = false;
            this.Wire();
        }

        public OnConnecting(action: Function): void {
            this._gamepadAPI.OnConnecting.Bind(action);
        }

        public OnDisconnecting(action: Function): void {
            this._gamepadAPI.OnDisconnecting.Bind(action);
        }

        public OnButtonDown(button: GamepadButton, action: Function): void {
            this._gamepadAPI.ButtonDownEvents[button].Bind(action);
        }

        public OnButtonUp(button: GamepadButton, action: Function): void {
            this._gamepadAPI.ButtonUpEvents[button].Bind(action);
        }

        /**
        * Disposes the GamepadHandler and unbinds all bound events.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this._gamepadAPI.Dispose();
                this.Unwire();
            }
            else {
                throw new Error("GamepadHandler cannot be disposed more than once");
            }
        }

        private Wire(): void {
            window.addEventListener("gamepadconnected", this._gamepadAPI.Connect.bind(this._gamepadAPI));
            window.addEventListener("gamepaddisconnected", this._gamepadAPI.Disconnect.bind(this._gamepadAPI));
        }

        private Unwire(): void {
            window.removeEventListener("gamepadconnected", this._gamepadAPI.Connect.bind(this._gamepadAPI));
            window.removeEventListener("gamepaddisconnected", this._gamepadAPI.Disconnect.bind(this._gamepadAPI));
        }
    }

    export enum GamepadButton {
        A,
        B,
        X,
        Y,
        LB,
        RB,
        LT,
        RT,
        Back,
        Start,
        L,
        R,
        DPadUp,
        DPadDown,
        DPadLeft,
        DPadRight,
        LeftStickUp,
        LeftStickDown,
        LeftStickLeft,
        LeftStickRight,
        RightStickUp,
        RightStickDown,
        RightStickLeft,
        RightStickRight,
    }

    export class GamepadAPI implements IDisposable {
        public static AXES_THRESHOLD: number = 0.3;

        // @ts-ignore
        private _controller: Gamepad;
        // @ts-ignore
        private _buttons: Array<string>;
        // @ts-ignore
        private _buttonsCache: Array<string>;
        // @ts-ignore
        private _buttonsStatus: Array<string>;
        // @ts-ignore
        private _requestId: number;
        // @ts-ignore
        private _disposed: boolean;

        // Handlers
        public OnConnecting: EventHandler;
        public OnDisconnecting: EventHandler;
        public ButtonDownEvents: EventHandler[];
        public ButtonUpEvents: EventHandler[];

        constructor() {
            this.OnConnecting = new EventHandler();
            this.OnDisconnecting = new EventHandler();

            this._buttons = [];
            this._buttonsStatus = [];
            this._buttonsCache = [];
            this.ButtonDownEvents = [];
            this.ButtonUpEvents = [];
            for (var key in GamepadButton) {
                this._buttons.push(GamepadButton[key]);
                this.ButtonDownEvents.push(new EventHandler());
                this.ButtonUpEvents.push(new EventHandler());
            }
        }

        public get PressedButtons(): string[] {
            return this._buttonsStatus;
        }

        public Connect(evt: Event): void {
            var gamepadEvent = evt as GamepadEvent;
            this._controller = gamepadEvent.gamepad;
            this.OnConnecting.Trigger();
            this._requestId = this.Loop();
        }

        public Disconnect(evt: Event): void {
            delete this._controller;
            this.OnDisconnecting.Trigger();
            cancelAnimationFrame(this._requestId);
        }

        private Loop(): number {
            this.FireEvents();
            this.UpdateController();
            this.Update();
            
            if (this.IsConnected()) {
                return requestAnimationFrame(() => this.Loop());
            }

            return this._requestId;
        }

        private IsConnected(): boolean {
            return this._controller && this._controller.connected;
        }

        private FireEvents(): void {
            for (var i = 0; i < this._buttons.length; i++) {
                var btn = this._buttons[i];
                var isPressed = this._buttonsStatus.indexOf(btn) != -1;
                var wasPressed = this._buttonsCache.indexOf(btn) != -1;
                if (isPressed && !wasPressed) {
                    this.ButtonDownEvents[this._buttons.indexOf(btn)].Trigger();
                } else if (wasPressed && !isPressed) {
                    this.ButtonUpEvents[this._buttons.indexOf(btn)].Trigger();
                }
            }
        }

        private UpdateController(): void {
            var gamepads = navigator.getGamepads();
            for (var i = 0; i < gamepads.length; i++)
            {
                if (gamepads[i] != null) {
                    this._controller = gamepads[i] as Gamepad;
                    break;
                }
            }
        }

        private Update(): string[] {
            if (!this.IsConnected()) return [];

            // clear the buttons cache
            this._buttonsCache = [];
            // move the buttons status from the previous frame to the cache
            for(var k = 0; k < this._buttonsStatus.length; k++) {
                this._buttonsCache[k] = this._buttonsStatus[k];
            }
            // clear the buttons status
            this._buttonsStatus = [];
            // get the gamepad object
            var c = this._controller || {};

            // loop through buttons and push the pressed ones to the array
            var pressed = [];
            if(c.buttons) {
                for(var b = 0,t = c.buttons.length; b < t; b++) {
                    if(c.buttons[b].pressed) {
                        pressed.push(this._buttons[b]);
                    }
                }
            }

            // loop through axes and push their values to the array
            var axes = new Array<number>();
            if(c.axes) {
                for(var a = 0,x = c.axes.length; a < x; a++) {
                    axes.push(c.axes[a]);
                }
            }
            
            var leftHorizontal = axes[0];
            var leftVertical = axes[1];
            var rightHorizontal = axes[2];
            var rightVertical = axes[3];

            // Left stick
            if (leftHorizontal < 0 && leftHorizontal < GamepadAPI.AXES_THRESHOLD * -1) {
                pressed.push(this._buttons[GamepadButton.LeftStickLeft]);
            } else if (leftHorizontal > 0 && leftHorizontal > GamepadAPI.AXES_THRESHOLD) {
                pressed.push(this._buttons[GamepadButton.LeftStickRight]);
            }
            if (leftVertical < 0 && leftVertical < GamepadAPI.AXES_THRESHOLD * -1) {
                pressed.push(this._buttons[GamepadButton.LeftStickUp]);
            } else if (leftVertical > 0 && leftVertical > GamepadAPI.AXES_THRESHOLD) {
                pressed.push(this._buttons[GamepadButton.LeftStickDown]);
            }

            // Right stick
            if (rightHorizontal < 0 && rightHorizontal < GamepadAPI.AXES_THRESHOLD * -1) {
                pressed.push(this._buttons[GamepadButton.RightStickLeft]);
            } else if (rightHorizontal > 0 && rightHorizontal > GamepadAPI.AXES_THRESHOLD) {
                pressed.push(this._buttons[GamepadButton.RightStickRight]);
            }
            if (rightVertical < 0 && rightVertical < GamepadAPI.AXES_THRESHOLD * -1) {
                pressed.push(this._buttons[GamepadButton.RightStickUp]);
            } else if (rightVertical > 0 && rightVertical > GamepadAPI.AXES_THRESHOLD) {
                pressed.push(this._buttons[GamepadButton.RightStickDown]);
            }

            this._buttonsStatus = pressed;
            return pressed;
        }

        /**
        * Disposes the GamepadAPI and unbinds all bound events.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this.OnConnecting.Dispose();
                this.OnDisconnecting.Dispose();
                for (var key in this.ButtonDownEvents) {
                    this.ButtonDownEvents[key].Dispose();
                }
                for (var key in this.ButtonUpEvents) {
                    this.ButtonUpEvents[key].Dispose();
                }
            }
            else {
                throw new Error("GamepadHandler cannot be disposed more than once");
            }
        }
    }

    export class MouseButton {
        public static Left: string = "Left";
        public static Middle: string = "Middle";
        public static Right: string = "Right";
    }

    /**
    * Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
    */
    export class MouseHandler implements IDisposable {
        // Used to determine mouse buttons without using extra conditional statements, performance enhancer
        private static MouseButtonArray = [null, MouseButton.Left, MouseButton.Middle, MouseButton.Right];

        // Active flags
        // @ts-ignore
        private _leftIsDown: boolean;
        // @ts-ignore
        private _middleIsDown: boolean;
        // @ts-ignore
        private _rightIsDown: boolean;
        // @ts-ignore
        private _isDown: boolean;

        // Events
        private _onClick: EventHandler1<IMouseClickEvent>;
        private _onDoubleClick: EventHandler1<IMouseClickEvent>;
        private _onDown: EventHandler1<IMouseClickEvent>;
        private _onUp: EventHandler1<IMouseClickEvent>;
        private _onMove: EventHandler1<IMouseEvent>;
        private _onScroll: EventHandler1<IMouseScrollEvent>;

        private _target: HTMLElement;

        // For disposing
        // @ts-ignore
        private _contextMenuWire: (e: MouseEvent) => void;
        // @ts-ignore
        private _clickWire: (e: MouseEvent) => void;
        // @ts-ignore
        private _dblClickWire: (e: MouseEvent) => void;
        // @ts-ignore
        private _mouseDownWire: (e: MouseEvent) => void;
        // @ts-ignore
        private _mouseUpWire: (e: MouseEvent) => void;
        // @ts-ignore
        private _mouseMoveWire: (e: MouseEvent) => void;
        // @ts-ignore
        private _mouseWheelWireName: string;
        // @ts-ignore
        private _mouseWheelWire: (e: MouseEvent) => void;
        private _disposed: boolean;

        /**
        * Creates a new instance of the MouseHandler object.
        * @param target The object to monitor mouse events for.
        */
        constructor(target: HTMLElement) {
            this._target = target;
            this._disposed = false;

            this._onClick = new EventHandler1<IMouseClickEvent>();
            this._onDoubleClick = new EventHandler1<IMouseClickEvent>();
            this._onDown = new EventHandler1<IMouseClickEvent>();
            this._onUp = new EventHandler1<IMouseClickEvent>();
            this._onMove = new EventHandler1<IMouseEvent>();
            this._onScroll = new EventHandler1<IMouseScrollEvent>();

            // Generic flags to check mouse state
            this._leftIsDown = false;
            this._middleIsDown = false;
            this._rightIsDown = false;

            this.Wire();

            this.OnDown.Bind((e: IMouseClickEvent) => {
                this._isDown = true;
                // @ts-ignore
                this["_" + e.Button.toLowerCase() + "IsDown"] = true;
                window.focus();
            });

            this.OnUp.Bind((e: IMouseClickEvent) => {
                this._isDown = false;
                // @ts-ignore
                this["_" + e.Button.toLowerCase() + "IsDown"] = false;
                window.focus();
            });

            this.OnClick.Bind((e: IMouseClickEvent) => {
                window.focus();
            });

            this.OnDoubleClick.Bind((e: IMouseClickEvent) => {
                window.focus();
            });
        }

        /**
        * Indicates if the left mouse button is down
        */
        public get LeftIsDown(): boolean {
            return this._leftIsDown;
        }

        /**
        * Indicates if the middle mouse button is down
        */
        public get MiddleIsDown(): boolean {
            return this._middleIsDown;
        }

        /**
        * Indicates if the right mouse button is down
        */
        public get RightIsDown(): boolean {
            return this._rightIsDown;
        }

        /**
        * Indicates if any mouse button is down.
        */
        public get IsDown(): boolean {
            return this._isDown;
        }

        /**
        * Gets an event that is triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnClick(): EventHandler1<IMouseClickEvent> {
            return this._onClick;
        }

        /**
        * Gets an event that is triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDoubleClick(): EventHandler1<IMouseClickEvent> {
            return this._onDoubleClick;
        }

        /**
        * Gets an event that is triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDown(): EventHandler1<IMouseClickEvent> {
            return this._onDown;
        }

        /**
        * Gets an event that is triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnUp(): EventHandler1<IMouseClickEvent> {
            return this._onUp;
        }

        /**
        * Gets an event that is triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnMove(): EventHandler1<IMouseEvent> {
            return this._onMove;
        }

        /**
        * Gets an event that is triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnScroll(): EventHandler1<IMouseScrollEvent> {
            return this._onScroll;
        }

        /**
        * Disposes the MouseHandler and unbinds all bound events.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this._onClick.Dispose();
                this._onDoubleClick.Dispose();
                this._onDown.Dispose();
                this._onMove.Dispose();
                this._onScroll.Dispose();
                this._onUp.Dispose();

                this.Unwire();

                // @ts-ignore
                this._target = null;
            }
            else {
                throw new Error("MouseHandler cannot be disposed more than once");
            }
        }

        private Wire(): void {
            this._clickWire = this._contextMenuWire = this.BuildEvent<IMouseClickEvent>(this._onClick, this.BuildMouseClickEvent);
            this._dblClickWire = this.BuildEvent<IMouseClickEvent>(this._onDoubleClick, this.BuildMouseClickEvent);
            this._mouseDownWire = this.BuildEvent<IMouseClickEvent>(this._onDown, this.BuildMouseClickEvent);
            this._mouseUpWire = this.BuildEvent<IMouseClickEvent>(this._onUp, this.BuildMouseClickEvent)
            this._mouseMoveWire = this.BuildEvent<IMouseEvent>(this._onMove, this.BuildMouseEvent);

            // OnScroll, in order to detect horizontal scrolling need to hack a bit (browser sniffing)
            // if we were just doing vertical scrolling we could settle with the else statement in this block
            if ((/MSIE/i.test(navigator.userAgent)) || (/Trident/i.test(navigator.userAgent))) {
                this._mouseWheelWireName = "wheel";
                this._mouseWheelWire = this.BuildEvent<IMouseScrollEvent>(this._onScroll, (e: any) => {
                    e.wheelDeltaX = -e.deltaX;
                    e.wheelDeltaY = -e.deltaY;
                    return this.BuildMouseScrollEvent(e);
                });
            }
            else if ((/Firefox/i.test(navigator.userAgent))) {
                this._mouseWheelWireName = "DOMMouseScroll";
                this._mouseWheelWire = this.BuildEvent<IMouseScrollEvent>(this._onScroll, (e: any) => {
                    e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                    e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                    return this.BuildMouseScrollEvent(e);
                });
            }
            else {
                this._mouseWheelWireName = "mousewheel";
                // @ts-ignore
                this._mouseWheelWire = this.BuildEvent<IMouseScrollEvent>(this._onScroll, this.BuildMouseScrollEvent);
            }

            this._target.addEventListener("click", this._clickWire, false);
            this._target.addEventListener("contextmenu", this._contextMenuWire, false);
            this._target.addEventListener("dblclick", this._dblClickWire, false);
            this._target.addEventListener("mousedown", this._mouseDownWire, false);
            this._target.addEventListener("mouseup", this._mouseUpWire, false);
            this._target.addEventListener("mousemove", this._mouseMoveWire, false);
            // @ts-ignore
            this._target.addEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
        }

        private Unwire(): void {
            this._target.removeEventListener("click", this._clickWire, false);
            this._target.removeEventListener("contextmenu", this._contextMenuWire, false);
            this._target.removeEventListener("dblclick", this._dblClickWire, false);
            this._target.removeEventListener("mousedown", this._mouseDownWire, false);
            this._target.removeEventListener("mouseup", this._mouseUpWire, false);
            this._target.removeEventListener("mousemove", this._mouseMoveWire, false);
            // @ts-ignore
            this._target.removeEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
        }

        private BuildEvent<T>(eventHandler: EventHandler1<T>, mouseEventBuilder: (mouseEvent: MouseEvent) => IMouseEvent, returnValue: boolean = false): (e: MouseEvent) => void {
            return (e: MouseEvent) => {
                if (eventHandler.HasBindings()) {
                    eventHandler.Trigger(mouseEventBuilder.call(this, e));
                }

                e.preventDefault();

                return returnValue;
            }
        }

        private BuildMouseScrollEvent(event: MouseWheelEvent): IMouseScrollEvent {
            return {
                Position: this.GetMousePosition(event),
                Direction: this.GetMouseScrollDierction(event)
            };
        }

        private BuildMouseEvent(event: MouseEvent): IMouseEvent {
            return {
                Position: this.GetMousePosition(event)
            };
        }

        private BuildMouseClickEvent(event: MouseEvent): IMouseClickEvent {
            return {
                Position: this.GetMousePosition(event),
                Button: this.GetMouseButton(event)
            };
        }

        private GetMousePosition(event: MouseEvent): Vector2d {
            return new Vector2d(
                event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft,
                event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop
            );
        }

        private GetMouseButton(event: MouseEvent): string {
            if (event.which) {
                // @ts-ignore
                return MouseHandler.MouseButtonArray[event.which];
            }

            return MouseButton.Right;
        }

        private GetMouseScrollDierction(event: any): Vector2d {
            return new Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
        }
    }

    /**
    * Represents a mouse scroll event being triggered on the Game area.
    */
    export interface IMouseScrollEvent extends IMouseEvent {
        /**
        * The scroll direction. The Vector2d will contain 1, -1, or 0 values depending on the mouse scroll.
        */
        Direction: Vector2d;
    }

    /**
    * Represents a mouse event being triggered on the Game area.
    */
    export interface IMouseEvent {
        /**
        * The location of the mouse relative to the game area.
        */
        Position: Vector2d;
    }

    /**
    * Represents a mouse click event being triggered on the Game area.
    */
    export interface IMouseClickEvent extends IMouseEvent {
        /**
        * The mouse button that was clicked. Values can be "Left", "Right", or "Middle".
        */
        Button: string;
    }

    export enum Keys {
        Backspace = 8,
        Tab = 9,
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        Pause = 19,
        CapsLock = 20,
        Escape = 27,
        Space = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        LeftArrow = 37,
        UpArrow = 38,
        RightArrow = 39,
        DownArrow = 40,
        Insert = 45,
        Delete = 46,
        Num0 = 48,
        Num1 = 49,
        Num2 = 50,
        Num3 = 51,
        Num4 = 52,
        Num5 = 53,
        Num6 = 54,
        Num7 = 55,
        Num8 = 56,
        Num9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        LeftWindows = 91,
        RightWindows = 92,
        Menu = 93,
        NumPad0 = 96,
        NumPad1 = 97,
        NumPad2 = 98,
        NumPad3 = 99,
        NumPad4 = 100,
        NumPad5 = 101,
        NumPad6 = 102,
        NumPad7 = 103,
        NumPad8 = 104,
        NumPad9 = 105,
        Multiply = 106,
        Add = 107,
        Subtract = 109,
        DecimalPoint = 110,
        Divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        NumLock = 144,
        ScrollLock = 145,
        BrowserBack = 166,
        BrowserForward = 167,
        Semicolon = 186,
        Equal = 187,
        Comma = 188,
        Dash = 189,
        Period = 190,
        ForwardSlash = 191,
        GraveAccent = 192,
        OpenBracket = 219,
        BackSlash = 220,
        CloseBracket = 221,
        SingleQuote = 222
    }

    /**
    * Defines an object that is used to represent a keyboard modifier state to determine if Ctrl, Alt, or Shift is being pressed.
    */
    export class KeyboardModifiers {
        /**
        * Gets or sets the Ctrl component.  Represents if a Ctrl key is down.
        */
        public Ctrl: boolean;
        /**
        * Gets or sets the Alt component.  Represents if an Alt key is down.
        */
        public Alt: boolean;
        /**
        * Gets or sets the Shift component.  Represents if a Shift key is down.
        */
        public Shift: boolean;

        /**
        * Creates a new instance of the KeyboardModifiers object.
        * @param ctrl The initial value of the Ctrl component.
        * @param alt The initial value of the Alt component.
        * @param shift The initial value of the Shift component.
        */
        constructor(ctrl: boolean, alt: boolean, shift: boolean) {
            this.Ctrl = ctrl;
            this.Alt = alt;
            this.Shift = shift;
        }

        /**
        * Determines whether this KeyboardModifiers object has the same ctrl, alt, and shift states as the provided KeyboardModifiers.
        * @param modifier The KeyboardModifiers to compare the current modifiers to.
        */
        public Equivalent(modifier: KeyboardModifiers): boolean {
            return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
        }

        /**
        * Builds a KeyboardModifiers object to represent the state of an expected keyCommand
        * @param keyCommand The command to analyze.
        */
        public static BuildFromCommandString(keyCommand: string): KeyboardModifiers {
            var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false,
                alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false,
                shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;

            return new KeyboardModifiers(ctrl, alt, shift);
        }
    }

    /**
    * Defines a handler that will check for keyboard commands and execute appropriate functions.
    */
    export class KeyboardHandler implements IDisposable {
        private static _keyboardCommandIds: number = 0;
        // @ts-ignore
        private _target: HTMLCanvasElement;
        private _onPressCommands: { [id: number]: KeyboardCommand; };
        private _onDownCommands: { [id: number]: KeyboardCommand; };
        private _onUpCommands: { [id: number]: KeyboardCommand; };

        private _onKeyPress: EventHandler1<KeyboardCommandEvent>;
        private _onKeyDown: EventHandler1<KeyboardCommandEvent>;
        private _onKeyUp: EventHandler1<KeyboardCommandEvent>;

        // For Disposing purposes
        // @ts-ignore
        private _keyDownWire: (ke: KeyboardEvent) => void;
        // @ts-ignore
        private _keyUpWire: (ke: KeyboardEvent) => void;
        // @ts-ignore
        private _keyPressWire: (ke: KeyboardEvent) => void;
        private _disposed: boolean;

        /**
        * Creates a new instance of the KeyboardHandler object.
        */
        constructor() {
            this._onPressCommands = (<any>{});
            this._onDownCommands = (<any>{});
            this._onUpCommands = (<any>{});

            this._onKeyPress = new EventHandler1<KeyboardCommandEvent>();
            this._onKeyDown = new EventHandler1<KeyboardCommandEvent>();
            this._onKeyUp = new EventHandler1<KeyboardCommandEvent>();

            this._disposed = false;

            this.Wire();
        }

        /**
        * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyPress(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyPress;
        }

        /**
        *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyDown(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyDown;
        }

        /**
        * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyUp(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyUp;
        }

        /**
        * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has been pressed.
        */
        public OnCommandPress(keyCommand: string, action: Function): KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onPressCommands);
        }

        /**
        * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has is down.
        */
        public OnCommandDown(keyCommand: string, action: Function): KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onDownCommands);
        }

        /**
        * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand comes up.
        */
        public OnCommandUp(keyCommand: string, action: Function): KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onUpCommands);
        }

        /**
        * Disposes the KeyboardHandler and unbinds all bound events.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this._onKeyDown.Dispose();
                this._onKeyPress.Dispose();
                this._onKeyUp.Dispose();

                for (var command in this._onDownCommands) {
                    this._onDownCommands[command].Dispose();
                }

                // @ts-ignore
                this._onDownCommands = null;

                for (var command in this._onUpCommands) {
                    this._onUpCommands[command].Dispose();
                }

                // @ts-ignore
                this._onUpCommands = null;

                for (var command in this._onPressCommands) {
                    this._onPressCommands[command].Dispose();
                }

                // @ts-ignore
                this._onPressCommands = null;

                this.Unwire();
            }
            else {
                throw new Error("KeyboardHandler cannot be disposed more than once");
            }
        }

        private UpdateCache(keyCommand: string, action: Function, store: { [id: number]: KeyboardCommand; }): KeyboardCommand {
            var command = new KeyboardCommand(keyCommand, action),
                commandId = KeyboardHandler._keyboardCommandIds++;

            command.OnDispose.Bind(() => {
                delete store[commandId];
            });

            store[commandId] = command;

            return command;
        }

        private Wire(): void {
            this._keyPressWire = this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress);
            this._keyDownWire = this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown);
            this._keyUpWire = this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp);

            document.addEventListener("keypress", this._keyPressWire, false);

            document.addEventListener("keydown", this._keyDownWire, false);

            document.addEventListener("keyup", this._keyUpWire, false);
        }

        private Unwire(): void {
            document.removeEventListener("keypress", this._keyPressWire, false);
            document.removeEventListener("keydown", this._keyDownWire, false);
            document.removeEventListener("keyup", this._keyUpWire, false);
        }

        private BuildKeyEvent(store: { [id: number]: KeyboardCommand; }, eventHandler: EventHandler1<KeyboardCommandEvent>): (ke: KeyboardEvent) => void {
            return (ke: KeyboardEvent) => {
                var keyboardCommandEvent: KeyboardCommandEvent,
                    propogate: boolean = true;

                keyboardCommandEvent = new KeyboardCommandEvent(ke);

                eventHandler.Trigger(keyboardCommandEvent);

                for (var keyboardCommandId in store) {
                    if (keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                        store[keyboardCommandId].Action();
                        ke.preventDefault();
                        propogate = false;
                    }
                }

                return propogate;
            };
        }
    }

    /**
 * HtmlElement that triggered a KeyboardEvent. 
 */
    export class KeyboardEventTarget {
        private _id: string;
        private _classes: string[];
        private _element: HTMLElement;
        private _tag: string;

        /**
        * Gets the id of the target element.
        */
        public get Id(): string {
            return this._id;
        }

        /**
        * Gets a list of classes on the target element.
        */
        public get Classes(): string[] {
            return this._classes;
        }

        /**
        * Gets the element that caused the keyboard event.
        */
        public get Element(): HTMLElement {
            return this._element;
        }

        /**
        * Gets the type of tag of the target element.
        */
        public get Tag(): string {
            return this._tag;
        }

        constructor(target: EventTarget) {
            this._element = <HTMLElement>target;
            this._id = this._element.id;
            this._classes = Array.prototype.slice.call(this._element.classList);
            this._tag = this._element.tagName;
        }
    }

    export class KeyboardCommandHelper {
        public static ParseKey(command: string): string {
            var arr = command.split("+");

            if (arr.length > 1) {
                return arr[arr.length - 1];
            }

            return arr[0];
        }
    }

    var shiftValues: { [unmodified: string]: string; } = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        "$": "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        "_": "-",
        "+": "=",
        ":": ";",
        "\"": "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
    },
        specialKeys: { [name: string]: string; } = {
            "27": "esc",
            "9": "tab",
            "32": "space",
            "13": "return",
            "8": "backspace",
            "45": "insert",
            "36": "home",
            "46": "delete",
            "35": "end",
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down",
            "112": "f1",
            "113": "f2",
            "114": "f3",
            "115": "f4",
            "116": "f5",
            "117": "f6",
            "118": "f7",
            "119": "f8",
            "120": "f9",
            "121": "f10",
            "122": "f11",
            "123": "f12"
        };

    /**
    * Defines a KeyboardCommandEvent object that represents when a command has been attempted.
    */
    export class KeyboardCommandEvent {
        /**
        * The key that was hit.
        */
        public Key: string;
        /**
        * The key that was hit.
        */
        public KeyCode: Keys;
        /**
        * The modifier status.
        */
        public Modifiers: KeyboardModifiers;

        /**
        * Target element which triggered the event.
        */
        public Target: KeyboardEventTarget;

        /**
        * Creates a new instance of the KeyboardCommandEvent object.
        * @param keyEvent The raw key event from the DOM.
        */
        constructor(keyEvent: KeyboardEvent) {
            var code,
                character;

            this.Modifiers = new KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);

            if (keyEvent.keyCode) {
                code = keyEvent.keyCode;
            }
            else if (keyEvent.which) {
                code = keyEvent.which;
            }

            if (!((character = String.fromCharCode(keyEvent.keyCode)) === keyEvent.key)) {
                // @ts-ignore
                if (!(character = specialKeys[code])) {
                    // @ts-ignore
                    character = String.fromCharCode(code).toLowerCase();

                    if (this.Modifiers.Shift && shiftValues[character]) {
                        character = shiftValues[character];
                    }
                }
            }

            this.Key = character;
            this.KeyCode = (<Keys>code);
            // @ts-ignore
            this.Target = new KeyboardEventTarget(keyEvent.target);
        }

        /**
        * Determines if the KeyboardCommand matches the KeyboardCommandEvent
        * @param command The KeyboardCommand to check.
        */
        public Matches(command: KeyboardCommand): boolean {
            return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
        }
    }

    /**
 * Defines a class that is used to represent a keyboard command.
 */
    export class KeyboardCommand implements IDisposable {
        /**
        * Gets or sets the Key that is required to trigger the Action.
        */
        public Key: string;
        /**
        * Gets or sets the Action that is triggered when the KeyboardCommand has been successfully executed.
        */
        public Action: Function;
        /**
        * Gets or sets the Modifiers that are required to trigger the Action.
        */
        public Modifiers: KeyboardModifiers;

        private _onDisposeInvoker: NoopTripInvoker;
        private _onDisposed: EventHandler;

        /**
        * Creates a new instance of the KeyboardCommand object.
        * @param command Initial command required to trigger the action function.
        * @param action Initial action to be triggered when the command is executed..
        */
        constructor(command: string, action: Function) {
            this.Action = action;
            this.Modifiers = KeyboardModifiers.BuildFromCommandString(command);
            this.Key = KeyboardCommandHelper.ParseKey(command);

            this._onDisposed = new EventHandler();
            this._onDisposeInvoker = new NoopTripInvoker(() => {
                this._onDisposed.Trigger();
            }, true);
        }

        /**
        * Gets an event that is triggered when a KeyboardCommand has been disposed.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDispose(): EventHandler {
            return this._onDisposed;
        }

        /**
        * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
        */
        public Dispose(): void {
            this._onDisposeInvoker.InvokeOnce();
        }
    }
}