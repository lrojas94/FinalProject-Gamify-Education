import * as React from 'react';

export class Header extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
      {/* BEGIN HEADER */}
        <div className="page-header navbar navbar-fixed-top">
          {/* BEGIN HEADER INNER */}
          <div className="page-header-inner">
            {/* BEGIN LOGO */}
            <div className="page-logo">
              <a href="index.html">
                <img src="../assets/layouts/layout/img/logo.png" alt="logo" className="logo-default" /> </a>
              <div className="menu-toggler sidebar-toggler">
                <span />
              </div>
            </div>
            {/* END LOGO */}
            {/* BEGIN RESPONSIVE MENU TOGGLER */}
            <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
              <span />
            </a>
            {/* END RESPONSIVE MENU TOGGLER */}
            {/* BEGIN TOP NAVIGATION MENU */}
            <div className="top-menu">
              <ul className="nav navbar-nav pull-right">
                {/* BEGIN CALENDAR DROPDOWN */}
                {/* DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte */}
                <li className="dropdown dropdown-extended dropdown-tasks" id="header_task_bar">
                  <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                    <i className="icon-calendar" />
                    <span className="badge badge-default"> 3 </span>
                  </a>
                  <ul className="dropdown-menu extended tasks">
                    <li className="external">
                      <h3>You have
                        <span className="bold">12 pending</span> tasks</h3>
                      <a href="app_todo.html">view all</a>
                    </li>
                    <li>
                      <ul className="dropdown-menu-list scroller" style={{height: 275}} data-handle-color="#637283">
                        <li>
                          <a href="javascript:;">
                            <span className="task">
                              <span className="desc">New release v1.2 </span>
                              <span className="percent">30%</span>
                            </span>
                            <span className="progress">
                              <span style={{width: '40%'}} className="progress-bar progress-bar-success" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                                <span className="sr-only">40% Complete</span>
                              </span>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <span className="task">
                              <span className="desc">Application deployment</span>
                              <span className="percent">65%</span>
                            </span>
                            <span className="progress">
                              <span style={{width: '65%'}} className="progress-bar progress-bar-danger" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
                                <span className="sr-only">65% Complete</span>
                              </span>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <span className="task">
                              <span className="desc">Mobile app release</span>
                              <span className="percent">98%</span>
                            </span>
                            <span className="progress">
                              <span style={{width: '98%'}} className="progress-bar progress-bar-success" aria-valuenow={98} aria-valuemin={0} aria-valuemax={100}>
                                <span className="sr-only">98% Complete</span>
                              </span>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <span className="task">
                              <span className="desc">Database migration</span>
                              <span className="percent">10%</span>
                            </span>
                            <span className="progress">
                              <span style={{width: '10%'}} className="progress-bar progress-bar-warning" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}>
                                <span className="sr-only">10% Complete</span>
                              </span>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <span className="task">
                              <span className="desc">Web server upgrade</span>
                              <span className="percent">58%</span>
                            </span>
                            <span className="progress">
                              <span style={{width: '58%'}} className="progress-bar progress-bar-info" aria-valuenow={58} aria-valuemin={0} aria-valuemax={100}>
                                <span className="sr-only">58% Complete</span>
                              </span>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <span className="task">
                              <span className="desc">Mobile development</span>
                              <span className="percent">85%</span>
                            </span>
                            <span className="progress">
                              <span style={{width: '85%'}} className="progress-bar progress-bar-success" aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}>
                                <span className="sr-only">85% Complete</span>
                              </span>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <span className="task">
                              <span className="desc">New UI release</span>
                              <span className="percent">38%</span>
                            </span>
                            <span className="progress progress-striped">
                              <span style={{width: '38%'}} className="progress-bar progress-bar-important" aria-valuenow={18} aria-valuemin={0} aria-valuemax={100}>
                                <span className="sr-only">38% Complete</span>
                              </span>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                {/* END CALENDAR DROPDOWN */}
                {/* BEGIN USER LOGIN DROPDOWN */}
                {/* DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte */}
                <li className="dropdown dropdown-user">
                  <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                    <img alt className="img-circle" src="../assets/layouts/layout/img/avatar3_small.jpg" />
                    <span className="username username-hide-on-mobile"> Nick </span>
                    <i className="fa fa-angle-down" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-default">
                    <li>
                      <a href="page_user_profile_1.html">
                        <i className="icon-user" /> Perfil </a>
                    </li>
                    <li>
                      <a href="app_calendar.html">
                        <i className="icon-calendar" /> Calendario </a>
                    </li>
                    <li className="divider"> </li>
                    <li>
                      <a href="page_user_login_1.html">
                        <i className="icon-key" /> Cerrar Sesion </a>
                    </li>
                  </ul>
                </li>
                {/* END USER LOGIN DROPDOWN */}
              </ul>
            </div>
            {/* END TOP NAVIGATION MENU */}
          </div>
          {/* END HEADER INNER */}
        </div>
        {/* END HEADER */}
      </div>
    );
  }
}
