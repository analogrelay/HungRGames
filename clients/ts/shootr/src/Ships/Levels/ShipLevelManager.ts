import * as eg from "../../../../endgate/endgate";
import { IShipData } from "../../Server/IPayloadDefinitions";

export class ShipLevelManager {
    public Level: number;
    public Experience: number;
    public ExperienceToNextLevel: number;

    constructor(payload: IShipData) {
        this.Level = payload.Level;
        this.Experience = 0;
        this.ExperienceToNextLevel = 1000000;
        this.OnLevelChange = new eg.EventHandler1<number>();
        this.OnExperienceChange = new eg.EventHandler2<number, number>();
    }

    public OnLevelChange: eg.EventHandler1<number>;
    public OnExperienceChange: eg.EventHandler2<number, number>;

    public LoadPayload(payload: IShipData): void {
        if (payload.Level != this.Level) {
            this.Level = payload.Level;
            this.OnLevelChange.Trigger(this.Level);
        }
    }

    public UpdateExperience(experience: number, experienceToNextLevel: number): void {
        if (experience !== this.Experience || experienceToNextLevel !== this.ExperienceToNextLevel) {
            this.Experience = experience;
            this.ExperienceToNextLevel = experienceToNextLevel;
            this.OnExperienceChange.Trigger(experience, experienceToNextLevel);
        }
    }
}