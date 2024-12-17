import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className="page-title">
          <span className="page-title-text clickable" data-type="self">
            Matrix Gaming
          </span>
        </div>
      </header>
      <section className="main">
        <div className="product">
          <div className="product-title">
            <span className="product-title-text aos" data-type="fade-in">
              Our Product
            </span>
          </div>
          <div className="product-content">
            <div className="product-content-brand">
              <div className="brand-pic">
                <img src={require("../Assets/smartwin.png")} alt="Smartwin" />
              </div>
              <p className="brand-name">SmartWin</p>
              <div className="brand-links">
                <a
                  className="item-icon"
                  href="/SmartWin-2.1.0-Setup.exe"
                  target="_blank"
                // onClick={() =>
                //   (window.location.href =
                //     "https://drive.google.com/file/d/1D1z6fTroyHyu0JpMTbr1yRn3gfx3RTBP/view?usp=sharing")
                // }
                >
                  <i
                    class="fa-brands fa-windows"
                    style={{ color: "rgb(0 100 150)" }}
                  ></i>
                </a>
                <div
                  className="item-icon ms-3"
                  onClick={() => navigate("/smartwinresult")}
                >
                  <i
                    class="fa-solid fa-globe"
                    style={{ color: "rgb(0 100 150)" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="product-content-brand">
              <div className="brand-pic">
                <img src={require("../Assets/jackpot.png")} alt="JackPot" />
              </div>
              <p className="brand-name">JackPot</p>
              <div className="brand-links">
                <a
                  className="item-icon"
                  href="/JackPot-2.0.3-Setup.exe"
                  target="_blank"
                // onClick={() =>
                // (window.location.href =
                //   "https://drive.google.com/file/d/1tImJnV8mUo04d6ANcqlxblM3Hvk5iP6V/view?usp=sharing")
                // }
                >
                  <i
                    class="fa-brands fa-windows"
                    style={{ color: "rgb(0 100 150)" }}
                  ></i>
                </a>
                <div
                  className="item-icon ms-3"
                  onClick={() => navigate("/jackpotresult")}
                >
                  <i
                    class="fa-solid fa-globe"
                    style={{ color: "rgb(0 100 150)" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="product-content-brand">
              <div className="brand-pic">
                <img src={require("../Assets/mgdelux.png")} alt="MGDeluxe" />
              </div>
              <p className="brand-name">MG Deluxe</p>
              <div className="brand-links">
                <a
                  className="item-icon"
                  href="/mgdeluxe.zip"
                  target="_blank"
                // onClick={() =>
                // (window.location.href =
                //   "https://drive.google.com/uc?export=download&id=1sM3lAV_Y8KwbzGxpwF451bAtf2ACiMRF")
                // }
                >
                  <i
                    class="fa-brands fa-windows"
                    style={{ color: "rgb(0 100 150)" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tools">
        <div className="tools-content">
          <div
            className="tools-content-item"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <p
              className="clickable name"
              data-type="download"
              onClick={() =>
              (window.location.href =
                "https://drive.google.com/uc?export=download&id=1ENZMsZDp16JCfEW8lKlclEN5rYqetVAL")
              }
            >
              Printer Driver
            </p>
          </div>
          <div
            className="tools-content-item"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <p
              className="clickable name"
              data-type="download"
              onClick={() =>
              (window.location.href =
                "https://drive.google.com/uc?export=download&id=1RgWOSP09h1jP8sBulJmLquDkt_6MNTWG")
              }
            >
              .Net 2.0 SP2
            </p>
          </div>
          <div
            className="tools-content-item"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <p
              className="clickable name"
              data-type="download"
              onClick={() =>
              (window.location.href =
                "https://anydesk.com/en/downloads/windows")
              }
            >
              AnyDesk
            </p>
          </div>
          <div
            className="tools-content-item"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <p
              className="clickable name"
              data-type="download"
              onClick={() =>
              (window.location.href =
                "https://www.win-rar.com/predownload.html?&L=0&Version=32bit")
              }
            >
              WinRAR
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <span className="footer-text clickable" data-type="">
            Matrix Gaming © All Right Reserved
          </span>
        </div>
      </footer>
    </>
  );
}

export default Home;
