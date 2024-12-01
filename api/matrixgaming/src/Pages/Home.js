import React from "react";

function Home() {
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
                <img src={require("../Assets/icon.ico")} alt="Smartwin" />
              </div>
              <p className="brand-name">SmartWin</p>
              <div className="brand-links">
                <div className="item-icon">
                  <i
                    class="fa-brands fa-windows"
                    style={{ color: "rgb(0 100 150)" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="product-content-brand">
              <div className="brand-pic">
                <img src={require("../Assets/iconJACK.ico")} alt="JackPot" />
              </div>
              <p className="brand-name">JackPot</p>
              <div className="brand-links">
                <div className="item-icon">
                  <i
                    class="fa-brands fa-windows"
                    style={{ color: "rgb(0 100 150)" }}
                  ></i>
                </div>
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
              data-target="tools/Thermal.rar"
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
              data-target="tools/NetFx20SP2_x86.rar"
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
              data-target="https://anydesk.com/en/downloads/windows"
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
              data-target="https://www.win-rar.com/predownload.html?&L=0&Version=32bit"
            >
              WinRAR
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <span className="footer-text clickable" data-type="">
            Fortun Play © All Right Reserved
          </span>
        </div>
      </footer>
    </>
  );
}

export default Home;
