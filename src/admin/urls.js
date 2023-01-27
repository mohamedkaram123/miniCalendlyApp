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
import { Urls } from "helper.js";
import packageJson from '../../package.json';

var perfix= "/calender";
var host = window.location.origin + window.location.pathname + "#";

var pathes = { 
    login:Urls.api + "v1/login",
    register:Urls.api + "v1/register",
    logout:Urls.api + "v1/logout",
    update_res_google:Urls.api + "v1/update_res_google",
    store_event:Urls.api + "v1/events/store",
    update_event:Urls.api + "v1/events/update",
    update_level1:Urls.api + "v1/events/update_level1",
    get_locations:Urls.api + "v1/events/locations",
    events_user:Urls.api + "v1/events/events_user",
    get_event:Urls.api + "v1/events/get_event",
    times_event:Urls.api + "v1/events/get_all_times",
    event_confirm_store:Urls.api + "v1/events/event_confirm_store",
    turn_event:Urls.api + "v1/events/turn_event",


    event_link:`${perfix}/:user_name/:slug`,
    app_path:packageJson.homepage,
    perfix,
    new_event:`${perfix}/event/create`,
    edit_event:`${perfix}/event/edit`,
    edit_level1_event:`${perfix}/event/edit/level1`,
    edit_level2_event:`${perfix}/event/edit/level2`,
    login_form:`${perfix}/login`,
    register_form:`${perfix}/register`,
    event_confirm:`${perfix}/event/confirm`,
    about:`${perfix}/about`,

    home:`${perfix}/home`,
    base_path:`${host + perfix}`
};

export default pathes;