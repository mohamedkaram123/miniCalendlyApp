import React,{useState} from 'react'
import routes from 'admin/routes'
import { Link } from 'react-router-dom'
import { checkRole } from '../components/roles/roles'
import { useTranslation } from "react-i18next";
import { Urls,user,check_branches } from 'helper';
import { name } from 'helper';

export default function Saidbar() {
             const [trans,i18n] = useTranslation();
    const [active_bar, setactive_bar] = useState("/dashboard")
  return (
          <nav id="sidebar" >
          <div className="sidebar-header text-center">
              <a href='/Connect/' className='text-reset'>
                  <img src={Urls.public + "img/1802749.png"} style={{width:120,height:100}} />
              <h3>{name()}</h3>
              </a>
              
              <hr />
            </div>

            <ul  className="list-unstyled components">
                 {/* <li>
                    <a href="#pageSubmenu" data-bs-toggle="collapse" data-bs-target="#pageSubmenu" aria-expanded="false" className="text-reset said-text dropdown-toggle">Pages</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a className='text-reset said-text' href="#">Page 1</a>
                        </li>
                        <li>
                            <a className='text-reset said-text' href="#">Page 2</a>
                        </li>
                        <li>
                            <a className='text-reset said-text' href="#">Page 3</a>
                        </li>
                    </ul>
                </li> */}
              
              {
                  routes.map((item, i) => {
                      if (item.branches.length > 0) {
                          
                          if (checkRole(item.permission_id)) {
                              return (
                                  <li key={i}>
                                      <a href={`#${item.name}`} data-bs-toggle="collapse" data-bs-target={`#${item.name}`} aria-expanded="false" className='d-flex flex-inline text-reset dropdown-toggle ' style={{ alignItems: "center" }} >
                                          <i className={item.icon}></i>
                                          <span style={{ marginInline: 10 }}>{trans(item.name)}</span>
                                      </a>
                                      <ul className="collapse   list-unstyled" style={{ marginInlineStart: -15 }} id={item.name} >
                                          {item.branches.map((item, i) => {
                                              if (checkRole(item.permission_id)) {

                                                 
                                                      return (
                                                      <li key={i}>
                         
                                                          <Link onClick={() => {
                                                              setactive_bar(item.path)
                                                          }} className={`d-flex flex-inline   ${active_bar == item.path ? "active-said" : "text-reset"}`} style={{ alignItems: "center" }} to={"/admin" + item.path}>
                                                              <i className={item.icon}></i>
                                                              <span style={{ marginInline: 10 }}>{trans(item.name)}</span>
                           
                                                          </Link>
                                                      </li>
                                                  )
                                                  
                                                  
                                                  
                                              }else{
                                                  return null;
                                              }
                                          })}
                                      </ul>
                                  </li>
                              )
                          } else { 
                                                            return null

                          }

                      } else {
                         
                          if (checkRole(item.permission_id)) {
                         
                              return (
                                  <li key={i}>
                         
                                      <Link onClick={() => {
                                          setactive_bar(item.path)
                                      }} className={`d-flex flex-inline  ${active_bar == item.path ? "active-said" : "text-reset "}`} style={{ alignItems: "center" }} to={"/admin" + item.path}>
                                          <i className={item.icon}></i>
                                          <span style={{ marginInline: 10 }}>{trans(item.name)}</span>
                           
                                      </Link>
                                  </li>
                              )
                          } else {
                                
                              return null
                          }
                      }
                      
                      })
              }
              
            
            </ul>

        
        </nav>

  )
}
