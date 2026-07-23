import logoImage from "../assets/logo.png";

type LoadingScreenProps = {
  isVisible: boolean;
  isFadingOut: boolean;
};

export default function LoadingScreen({
  isVisible,
  isFadingOut,
}: LoadingScreenProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`loading-screen ${isFadingOut ? "loading-screen--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Insight Counseling"
    >
      <div className="loading-screen__backdrop" />

      <div className="loading-screen__content">
        <div className="loading-screen__logo-wrap">
          <div className="loading-screen__pulse" aria-hidden="true" />
          <img
            src={logoImage}
            alt=""
            className="loading-screen__logo"
            width={72}
            height={72}
          />
        </div>

        <div className="loading-screen__brand">
          <h1 className="loading-screen__title">Insight</h1>
          <p className="loading-screen__tagline">Psychology & Counseling</p>
        </div>

        <div className="loading-screen__progress" aria-hidden="true">
          <div className="loading-screen__progress-track">
            <div className="loading-screen__progress-bar" />
          </div>
       
        </div>
      </div>

      <div className="loading-screen__footer">
        <span className="loading-screen__badge">
          <svg
            className="loading-screen__badge-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Confidential & Professional Care
        </span>
      </div>
    </div>
  );
}
