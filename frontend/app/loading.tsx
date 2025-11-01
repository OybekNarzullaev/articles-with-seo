// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        {/* Asosiy Spinner - Ring bilan chiroyli */}
        <span className="loading loading-ring loading-lg text-primary"></span>

        {/* Qo'shimcha Spinnerlar uchun Variant - Infinity */}
        {/* <span className="loading loading-infinity loading-md text-secondary"></span> */}

        {/* Yuklanish Matni - Animatsiyali */}
        <p className="text-xl font-semibold text-base-content opacity-80">
          Yuklanmoqda...
        </p>

        {/* Progress Bar - Qo'shimcha chiroylik uchun */}
        <progress className="progress progress-primary w-64 h-2"></progress>
      </div>
    </div>
  );
}
