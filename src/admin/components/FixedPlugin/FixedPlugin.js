/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{useState} from "react";

// reactstrap components
import { Button, Dropdown, DropdownToggle, Badge } from "reactstrap";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { backgroundColors } from "../../contexts/BackgroundColorContext";
import { LangContext } from "../..//contexts/LangContext";
import { useTranslation } from "react-i18next";
import { dark_mode, dir,getLang,changeDirLang,get_color_sidebar_Navbar } from "../../../helper";
import $ from "jquery";
function FixedPlugin(props) {
  const [dropDownIsOpen, setdropDownIsOpen] = React.useState(false);
  const handleClick = () => {

    if (dropDownIsOpen) {
    $('#config_fiexed_plugin').animate(
    { deg: 0 },
    {
      duration: 500,
      step: function(now) {
        $(this).css({ transform: 'rotate(' + now + 'deg)' });
      }
    }
    );
      setTimeout(() => {
                  $("#fixed_menue").addClass("d-none")

      }, 500);

    } else {
        $('#config_fiexed_plugin').animate(
    { deg: 180 },
    {
      duration: 500,
      step: function(now) {
        $(this).css({ transform: 'rotate(' + now + 'deg)' });
      }
    }
        );
            setTimeout(() => {
      $("#fixed_menue").removeClass("d-none")

      }, 500);
    }
    setdropDownIsOpen(!dropDownIsOpen);
  };
  const [checkelement, setcheckelement] = useState(getLang())
    const [_get_color_sidebar_Navbar, set_color_sidebar_Navbar] = useState(get_color_sidebar_Navbar())
    const [_get_mode, set_mode] = useState(dark_mode())

  const [t, i18n] = useTranslation();
  
  const handleCheckedLang = (e) => {
    let lang = e.target.value;
    setcheckelement(lang)
    i18n.changeLanguage(lang)
    changeDirLang()
                         window.location.reload()

  }

  const handleColorSidNav = (val) => {
   var r = document.querySelector(':root');

    r.style.setProperty('--sidbar-navbar-color',val);
    localStorage.setItem("sidbar-navbar-color", val);

  }

  const mode_panel = (val) => {
     if (val === "#333") {
       $("#body_mode").addClass("dark")

    } else {
                $("#body_mode").removeClass("dark")

     }
        localStorage.setItem("dark_mode", val);

  }

  return (
    <div style={dir()==="rtl"?{left:0}:{right:0}} className="fixed-plugin">
      <Dropdown isOpen={dropDownIsOpen} toggle={handleClick}>
        <DropdownToggle tag="div">
          <i id="config_fiexed_plugin" className="fa fa-cog fa-2x" />
        </DropdownToggle>
        <div id="fixed_menue" className={`dropdown-menu dropdown-menu_${dir()} show d-flex flex-column p-4 d-none`} style={{justifyContent:"center",alignItems:"center"}}>
         
          
           <div className="my-2 text-center">
             <span style={{ color: "#fff" }}>{t("Background Mode")}</span>
     
          <div className="div">
                <input  type="radio" onChange={(e) =>
                   { 
                  mode_panel(e.target.value)}
                  } value={"#fff"} className="btn-check " name="mode_web" id="color1_mode" autoComplete="off"  />
                    <label className="btn mx-2 " style={{borderRadius:20,border:"1px solid #fff",background:"#fff",height:20}} htmlFor="color1_mode"></label>

                    <input type="radio"  onChange={(e) =>
                   { 
                  mode_panel(e.target.value)}
                  } value={"#333"} className="btn-check" name="mode_web" id="color2_mode" autoComplete="off"   />
            <label className="btn  mx-2" style={{ borderRadius: 20, border: "1px solid #fff",background:"#333" ,height:20}} htmlFor="color2_mode"></label>
            
          </div>
          </div>

          <div className="my-2 text-center">
             <span style={{ color: "#fff" }}>{t("Sidbar Background")}</span>
     
          <div className="div">
                <input  type="radio" onChange={(e) =>
                   { 
                  handleColorSidNav(e.target.value)}
                  } value={"#263C5C"} className="btn-check " name="sidebarNavColors" id="color1" autoComplete="off"  />
                    <label className="btn mx-2 " style={{borderRadius:20,border:"1px solid #fff",background:"#263C5C",height:20}} htmlFor="color1"></label>

                    <input type="radio"  onChange={(e)=> { 
                  handleColorSidNav(e.target.value)}} value={"#24A19C"} className="btn-check" name="sidebarNavColors" id="color2" autoComplete="off"   />
            <label className="btn  mx-2" style={{ borderRadius: 20, border: "1px solid #fff",background:"#24A19C" ,height:20}} htmlFor="color2"></label>
              <input type="radio"  onChange={(e)=> { 
                  handleColorSidNav(e.target.value)}} value={"#242526"} className="btn-check" name="sidebarNavColors" id="color3" autoComplete="off"    />
                    <label className="btn mx-2" style={{borderRadius:20,border:"1px solid #fff",background:"#242526",height:20}} htmlFor="color3"></label>
               
              
              <input type="radio"  onChange={(e)=> { 
                  handleColorSidNav(e.target.value)}} value={"#B42025"} className="btn-check" name="sidebarNavColors" id="color4" autoComplete="off"    />
                    <label className="btn mx-2" style={{borderRadius:20,border:"1px solid #fff",background:"#B42025",height:20}} htmlFor="color4"></label>
               
          </div>
          </div>
         
          <div className="text-center my-2">
             <span  style={{color:"#fff"}}>{ t("Lang")}</span>

            <div className="mt-2">
              
            <LangContext.Consumer>
              {({ lang,changeLang }) => (
                <>
                  {/* <span className="color-label">Ar</span>{" "} */}
                  {/* <Badge
                    className="badge bg-success mr-2"
                    onClick={() => {
                      changeLang("ar")
                              console.log({ lang });
           
                      i18n.changeLanguage("ar")
                     window.location.reload()

                    }}
                  /> */}
                  <input  type="radio" onChange={(e) =>
                   { handleCheckedLang(e)
                  changeLang(e.target.value)}
                  } value={"ar"} className="btn-check " name="options" id="option1" autoComplete="off" checked={checkelement == "ar"} />
                    <label className="btn btn-primary mx-2" style={{border:"1px solid #fff"}} htmlFor="option1">ar</label>

                    <input type="radio"  onChange={(e)=> { handleCheckedLang(e)
                  changeLang(e.target.value)}} value={"en"} className="btn-check" name="options" id="option2" autoComplete="off"  checked={checkelement=="en"}  />
                    <label className="btn btn-primary" style={{border:"1px solid #fff"}} htmlFor="option2">en</label>
               
                </>
              )}
            </LangContext.Consumer>
          </div>
          </div>
            
        </div>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
