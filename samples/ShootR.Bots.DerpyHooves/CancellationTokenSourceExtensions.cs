using System.Threading;
using System.Threading.Tasks;

namespace ShootR.Bots.DerpyHooves
{
    internal static class CancellationTokenSourceExtensions
    {
        public static Task WaitForCancellationAsync(this CancellationToken cancellationToken)
        {
            var tcs = new TaskCompletionSource<object>();
            cancellationToken.Register(() => tcs.TrySetResult(null));
            return tcs.Task;
        }
    }
}
