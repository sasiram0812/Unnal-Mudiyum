import React from "react";
import Navbar from "../components/Navbar";

function WorkingOnIt() {
  return (
    <>
      {/* Inline CSS */}
      <style>{`
        .working-page {
          min-height: 100vh;
          background: linear-gradient(
              rgba(245, 247, 250, 0.95),
              rgba(245, 247, 250, 0.95)
            ),
            url("https://www.transparenttextures.com/patterns/cubes.png");
          background-size: cover;
          display: flex;
          flex-direction: column;
        }

        .working-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          animation: fadeIn 0.8s ease-in-out;
        }

        .working-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 40px;
          max-width: 520px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
        }

        .working-card h1 {
          font-size: 2.2rem;
          color: #1e3a8a;
          margin-bottom: 10px;
        }

        .working-card p {
          font-size: 1.05rem;
          color: #555;
          margin-bottom: 25px;
        }

        .working-image {
          width: 100%;
          max-width: 320px;
          margin: 0 auto 20px;
          animation: float 3s ease-in-out infinite;
        }

        footer {
          text-align: center;
          padding: 15px 10px;
          font-size: 0.9rem;
          color: #666;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      <div className="working-page">
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <div className="working-container">
          <div className="working-card">
            <h1>🚧 Working on it</h1>
            <p>
              This feature is under development <br />
              and will be live <strong>ASAP</strong>.
            </p>

            <img
              src="https://illustrations.popsy.co/blue/work-from-home.svg"
              alt="Working illustration"
              className="working-image"
            />

            <p>Thank you for your patience 💙</p>
          </div>
        </div>

        {/* Footer */}
        <footer>
          © 2025 Unnal Mudiyum — Stress Relief <br />
          Created by <strong>SASIRAM V💙</strong>
        </footer>
      </div>
    </>
  );
}

export default WorkingOnIt;
