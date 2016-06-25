import * as React from 'react';

export class Dashboard extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        {/* BEGIN CONTENT */}
        <div className="page-content-wrapper">
          {/* BEGIN CONTENT BODY */}
          <div className="page-content">
            {/* BEGIN PAGE HEADER*/}
            {/* BEGIN THEME PANEL */}
            <div className="theme-panel hidden-xs hidden-sm">
              <div className="toggler"> </div>
              <div className="toggler-close"> </div>
              <div className="theme-options">
                <div className="theme-option theme-colors clearfix">
                  <span> THEME COLOR </span>
                  <ul>
                    <li className="color-default current tooltips" data-style="default" data-container="body" data-original-title="Default"> </li>
                    <li className="color-darkblue tooltips" data-style="darkblue" data-container="body" data-original-title="Dark Blue"> </li>
                    <li className="color-blue tooltips" data-style="blue" data-container="body" data-original-title="Blue"> </li>
                    <li className="color-grey tooltips" data-style="grey" data-container="body" data-original-title="Grey"> </li>
                    <li className="color-light tooltips" data-style="light" data-container="body" data-original-title="Light"> </li>
                    <li className="color-light2 tooltips" data-style="light2" data-container="body" data-html="true" data-original-title="Light 2"> </li>
                  </ul>
                </div>
                <div className="theme-option">
                  <span> Layout </span>
                  <select className="layout-option form-control input-sm">
                    <option value="fluid" selected="selected">Fluid</option>
                    <option value="boxed">Boxed</option>
                  </select>
                </div>
                <div className="theme-option">
                  <span> Header </span>
                  <select className="page-header-option form-control input-sm">
                    <option value="fixed" selected="selected">Fixed</option>
                    <option value="default">Default</option>
                  </select>
                </div>
                <div className="theme-option">
                  <span> Top Menu Dropdown</span>
                  <select className="page-header-top-dropdown-style-option form-control input-sm">
                    <option value="light" selected="selected">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="theme-option">
                  <span> Sidebar Mode</span>
                  <select className="sidebar-option form-control input-sm">
                    <option value="fixed">Fixed</option>
                    <option value="default" selected="selected">Default</option>
                  </select>
                </div>
                <div className="theme-option">
                  <span> Sidebar Menu </span>
                  <select className="sidebar-menu-option form-control input-sm">
                    <option value="accordion" selected="selected">Accordion</option>
                    <option value="hover">Hover</option>
                  </select>
                </div>
                <div className="theme-option">
                  <span> Sidebar Style </span>
                  <select className="sidebar-style-option form-control input-sm">
                    <option value="default" selected="selected">Default</option>
                    <option value="light">Light</option>
                  </select>
                </div>
                <div className="theme-option">
                  <span> Sidebar Position </span>
                  <select className="sidebar-pos-option form-control input-sm">
                    <option value="left" selected="selected">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="theme-option">
                  <span> Footer </span>
                  <select className="page-footer-option form-control input-sm">
                    <option value="fixed">Fixed</option>
                    <option value="default" selected="selected">Default</option>
                  </select>
                </div>
              </div>
            </div>
            {/* END THEME PANEL */}
            {/* BEGIN PAGE BAR */}
            <div className="page-bar">
              <ul className="page-breadcrumb">
                <li>
                  <a href="index.html">Home</a>
                  <i className="fa fa-circle" />
                </li>
                <li>
                  <span>Dashboard</span>
                </li>
              </ul>
              <div className="page-toolbar">
                <div id="dashboard-report-range" className="pull-right tooltips btn btn-sm" data-container="body" data-placement="bottom" data-original-title="Change dashboard date range">
                  <i className="icon-calendar" />&nbsp;
                  <span className="thin uppercase hidden-xs" />&nbsp;
                  <i className="fa fa-angle-down" />
                </div>
              </div>
            </div>
            {/* END PAGE BAR */}
            {/* BEGIN PAGE TITLE*/}
            <h3 className="page-title"> Dashboard
              <small>dashboard &amp; statistics</small>
            </h3>
            {/* END PAGE TITLE*/}
            {/* END PAGE HEADER*/}
            {/* BEGIN DASHBOARD STATS 1*/}
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <a className="dashboard-stat dashboard-stat-v2 blue" href="#">
                  <div className="visual">
                    <i className="fa fa-comments" />
                  </div>
                  <div className="details">
                    <div className="number">
                      <span data-counter="counterup" data-value={1349}>0</span>
                    </div>
                    <div className="desc"> New Feedbacks </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <a className="dashboard-stat dashboard-stat-v2 red" href="#">
                  <div className="visual">
                    <i className="fa fa-bar-chart-o" />
                  </div>
                  <div className="details">
                    <div className="number">
                      <span data-counter="counterup" data-value="12,5">0</span>M$ </div>
                    <div className="desc"> Total Profit </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <a className="dashboard-stat dashboard-stat-v2 green" href="#">
                  <div className="visual">
                    <i className="fa fa-shopping-cart" />
                  </div>
                  <div className="details">
                    <div className="number">
                      <span data-counter="counterup" data-value={549}>0</span>
                    </div>
                    <div className="desc"> New Orders </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <a className="dashboard-stat dashboard-stat-v2 purple" href="#">
                  <div className="visual">
                    <i className="fa fa-globe" />
                  </div>
                  <div className="details">
                    <div className="number"> +
                      <span data-counter="counterup" data-value={89} />% </div>
                    <div className="desc"> Brand Popularity </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="clearfix" />
            {/* END DASHBOARD STATS 1*/}
            <div className="row">
              <div className="col-md-6 col-sm-6">
                {/* BEGIN PORTLET*/}
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-bar-chart font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Site Visits</span>
                      <span className="caption-helper">weekly stats...</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group btn-group-devided" data-toggle="buttons">
                        <label className="btn red btn-outline btn-circle btn-sm active">
                          <input type="radio" name="options" className="toggle" id="option1" />New</label>
                        <label className="btn red btn-outline btn-circle btn-sm">
                          <input type="radio" name="options" className="toggle" id="option2" />Returning</label>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div id="site_statistics_loading">
                      <img src="../assets/global/img/loading.gif" alt="loading" /> </div>
                    <div id="site_statistics_content" className="display-none">
                      <div id="site_statistics" className="chart"> </div>
                    </div>
                  </div>
                </div>
                {/* END PORTLET*/}
              </div>
              <div className="col-md-6 col-sm-6">
                {/* BEGIN PORTLET*/}
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-share font-red-sunglo hide" />
                      <span className="caption-subject font-dark bold uppercase">Revenue</span>
                      <span className="caption-helper">monthly stats...</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group">
                        <a href className="btn dark btn-outline btn-circle btn-sm dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Filter Range
                          <span className="fa fa-angle-down"> </span>
                        </a>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <a href="javascript:;"> Q1 2014
                              <span className="label label-sm label-default"> past </span>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;"> Q2 2014
                              <span className="label label-sm label-default"> past </span>
                            </a>
                          </li>
                          <li className="active">
                            <a href="javascript:;"> Q3 2014
                              <span className="label label-sm label-success"> current </span>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;"> Q4 2014
                              <span className="label label-sm label-warning"> upcoming </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div id="site_activities_loading">
                      <img src="../assets/global/img/loading.gif" alt="loading" /> </div>
                    <div id="site_activities_content" className="display-none">
                      <div id="site_activities" style={{height: 228}}> </div>
                    </div>
                    <div style={{margin: '20px 0 10px 30px'}}>
                      <div className="row">
                        <div className="col-md-3 col-sm-3 col-xs-6 text-stat">
                          <span className="label label-sm label-success"> Revenue: </span>
                          <h3>$13,234</h3>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6 text-stat">
                          <span className="label label-sm label-info"> Tax: </span>
                          <h3>$134,900</h3>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6 text-stat">
                          <span className="label label-sm label-danger"> Shipment: </span>
                          <h3>$1,134</h3>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6 text-stat">
                          <span className="label label-sm label-warning"> Orders: </span>
                          <h3>235090</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END PORTLET*/}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="portlet light bordered">
                  <div className="portlet-title tabbable-line">
                    <div className="caption">
                      <i className="icon-bubbles font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Comments</span>
                    </div>
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#portlet_comments_1" data-toggle="tab"> Pending </a>
                      </li>
                      <li>
                        <a href="#portlet_comments_2" data-toggle="tab"> Approved </a>
                      </li>
                    </ul>
                  </div>
                  <div className="portlet-body">
                    <div className="tab-content">
                      <div className="tab-pane active" id="portlet_comments_1">
                        {/* BEGIN: Comments */}
                        <div className="mt-comments">
                          <div className="mt-comment">
                            <div className="mt-comment-img">
                              <img src="../assets/pages/media/users/avatar1.jpg" /> </div>
                            <div className="mt-comment-body">
                              <div className="mt-comment-info">
                                <span className="mt-comment-author">Michael Baker</span>
                                <span className="mt-comment-date">26 Feb, 10:30AM</span>
                              </div>
                              <div className="mt-comment-text"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
                              <div className="mt-comment-details">
                                <span className="mt-comment-status mt-comment-status-pending">Pending</span>
                                <ul className="mt-comment-actions">
                                  <li>
                                    <a href="#">Quick Edit</a>
                                  </li>
                                  <li>
                                    <a href="#">View</a>
                                  </li>
                                  <li>
                                    <a href="#">Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="mt-comment">
                            <div className="mt-comment-img">
                              <img src="../assets/pages/media/users/avatar6.jpg" /> </div>
                            <div className="mt-comment-body">
                              <div className="mt-comment-info">
                                <span className="mt-comment-author">Larisa Maskalyova</span>
                                <span className="mt-comment-date">12 Feb, 08:30AM</span>
                              </div>
                              <div className="mt-comment-text"> It is a long established fact that a reader will be distracted. </div>
                              <div className="mt-comment-details">
                                <span className="mt-comment-status mt-comment-status-rejected">Rejected</span>
                                <ul className="mt-comment-actions">
                                  <li>
                                    <a href="#">Quick Edit</a>
                                  </li>
                                  <li>
                                    <a href="#">View</a>
                                  </li>
                                  <li>
                                    <a href="#">Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="mt-comment">
                            <div className="mt-comment-img">
                              <img src="../assets/pages/media/users/avatar8.jpg" /> </div>
                            <div className="mt-comment-body">
                              <div className="mt-comment-info">
                                <span className="mt-comment-author">Natasha Kim</span>
                                <span className="mt-comment-date">19 Dec,09:50 AM</span>
                              </div>
                              <div className="mt-comment-text"> The generated Lorem or non-characteristic Ipsum is therefore or non-characteristic. </div>
                              <div className="mt-comment-details">
                                <span className="mt-comment-status mt-comment-status-pending">Pending</span>
                                <ul className="mt-comment-actions">
                                  <li>
                                    <a href="#">Quick Edit</a>
                                  </li>
                                  <li>
                                    <a href="#">View</a>
                                  </li>
                                  <li>
                                    <a href="#">Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="mt-comment">
                            <div className="mt-comment-img">
                              <img src="../assets/pages/media/users/avatar4.jpg" /> </div>
                            <div className="mt-comment-body">
                              <div className="mt-comment-info">
                                <span className="mt-comment-author">Sebastian Davidson</span>
                                <span className="mt-comment-date">10 Dec, 09:20 AM</span>
                              </div>
                              <div className="mt-comment-text"> The standard chunk of Lorem or non-characteristic Ipsum used since the 1500s or non-characteristic. </div>
                              <div className="mt-comment-details">
                                <span className="mt-comment-status mt-comment-status-rejected">Rejected</span>
                                <ul className="mt-comment-actions">
                                  <li>
                                    <a href="#">Quick Edit</a>
                                  </li>
                                  <li>
                                    <a href="#">View</a>
                                  </li>
                                  <li>
                                    <a href="#">Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* END: Comments */}
                      </div>
                      <div className="tab-pane" id="portlet_comments_2">
                        {/* BEGIN: Comments */}
                        <div className="mt-comments">
                          <div className="mt-comment">
                            <div className="mt-comment-img">
                              <img src="../assets/pages/media/users/avatar4.jpg" /> </div>
                            <div className="mt-comment-body">
                              <div className="mt-comment-info">
                                <span className="mt-comment-author">Michael Baker</span>
                                <span className="mt-comment-date">26 Feb, 10:30AM</span>
                              </div>
                              <div className="mt-comment-text"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy. </div>
                              <div className="mt-comment-details">
                                <span className="mt-comment-status mt-comment-status-approved">Approved</span>
                                <ul className="mt-comment-actions">
                                  <li>
                                    <a href="#">Quick Edit</a>
                                  </li>
                                  <li>
                                    <a href="#">View</a>
                                  </li>
                                  <li>
                                    <a href="#">Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="mt-comment">
                            <div className="mt-comment-img">
                              <img src="../assets/pages/media/users/avatar8.jpg" /> </div>
                            <div className="mt-comment-body">
                              <div className="mt-comment-info">
                                <span className="mt-comment-author">Larisa Maskalyova</span>
                                <span className="mt-comment-date">12 Feb, 08:30AM</span>
                              </div>
                              <div className="mt-comment-text"> It is a long established fact that a reader will be distracted by. </div>
                              <div className="mt-comment-details">
                                <span className="mt-comment-status mt-comment-status-approved">Approved</span>
                                <ul className="mt-comment-actions">
                                  <li>
                                    <a href="#">Quick Edit</a>
                                  </li>
                                  <li>
                                    <a href="#">View</a>
                                  </li>
                                  <li>
                                    <a href="#">Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="mt-comment">
                            <div className="mt-comment-img">
                              <img src="../assets/pages/media/users/avatar6.jpg" /> </div>
                            <div className="mt-comment-body">
                              <div className="mt-comment-info">
                                <span className="mt-comment-author">Natasha Kim</span>
                                <span className="mt-comment-date">19 Dec,09:50 AM</span>
                              </div>
                              <div className="mt-comment-text"> The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. </div>
                              <div className="mt-comment-details">
                                <span className="mt-comment-status mt-comment-status-approved">Approved</span>
                                <ul className="mt-comment-actions">
                                  <li>
                                    <a href="#">Quick Edit</a>
                                  </li>
                                  <li>
                                    <a href="#">View</a>
                                  </li>
                                  <li>
                                    <a href="#">Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="mt-comment">
                            <div className="mt-comment-img">
                              <img src="../assets/pages/media/users/avatar1.jpg" /> </div>
                            <div className="mt-comment-body">
                              <div className="mt-comment-info">
                                <span className="mt-comment-author">Sebastian Davidson</span>
                                <span className="mt-comment-date">10 Dec, 09:20 AM</span>
                              </div>
                              <div className="mt-comment-text"> The standard chunk of Lorem Ipsum used since the 1500s </div>
                              <div className="mt-comment-details">
                                <span className="mt-comment-status mt-comment-status-approved">Approved</span>
                                <ul className="mt-comment-actions">
                                  <li>
                                    <a href="#">Quick Edit</a>
                                  </li>
                                  <li>
                                    <a href="#">View</a>
                                  </li>
                                  <li>
                                    <a href="#">Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* END: Comments */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="portlet light bordered">
                  <div className="portlet-title tabbable-line">
                    <div className="caption">
                      <i className=" icon-social-twitter font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Quick Actions</span>
                    </div>
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#tab_actions_pending" data-toggle="tab"> Pending </a>
                      </li>
                      <li>
                        <a href="#tab_actions_completed" data-toggle="tab"> Completed </a>
                      </li>
                    </ul>
                  </div>
                  <div className="portlet-body">
                    <div className="tab-content">
                      <div className="tab-pane active" id="tab_actions_pending">
                        {/* BEGIN: Actions */}
                        <div className="mt-actions">
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar10.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className="icon-magnet" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Natasha Kim</span>
                                    <p className="mt-action-desc">Dummy text of the printing</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-green" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar3.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className=" icon-bubbles" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Gavin Bond</span>
                                    <p className="mt-action-desc">pending for approval</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-red" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar2.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className="icon-call-in" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Diana Berri</span>
                                    <p className="mt-action-desc">Lorem Ipsum is simply dummy text</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-green" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar7.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className=" icon-bell" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">John Clark</span>
                                    <p className="mt-action-desc">Text of the printing and typesetting industry</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-red" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar8.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className="icon-magnet" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Donna Clarkson </span>
                                    <p className="mt-action-desc">Simply dummy text of the printing</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-green" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar9.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className="icon-magnet" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Tom Larson</span>
                                    <p className="mt-action-desc">Lorem Ipsum is simply dummy text</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-green" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* END: Actions */}
                      </div>
                      <div className="tab-pane" id="tab_actions_completed">
                        {/* BEGIN:Completed*/}
                        <div className="mt-actions">
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar1.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className="icon-action-redo" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Frank Cameron</span>
                                    <p className="mt-action-desc">Lorem Ipsum is simply dummy</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-red" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar8.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className="icon-cup" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Ella Davidson </span>
                                    <p className="mt-action-desc">Text of the printing and typesetting industry</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-green" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar5.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className=" icon-graduation" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Jason Dickens </span>
                                    <p className="mt-action-desc">Dummy text of the printing and typesetting industry</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-red" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-action">
                            <div className="mt-action-img">
                              <img src="../assets/pages/media/users/avatar2.jpg" /> </div>
                            <div className="mt-action-body">
                              <div className="mt-action-row">
                                <div className="mt-action-info ">
                                  <div className="mt-action-icon ">
                                    <i className="icon-badge" />
                                  </div>
                                  <div className="mt-action-details ">
                                    <span className="mt-action-author">Jan Kim</span>
                                    <p className="mt-action-desc">Lorem Ipsum is simply dummy</p>
                                  </div>
                                </div>
                                <div className="mt-action-datetime ">
                                  <span className="mt-action-date">3 jun</span>
                                  <span className="mt-action-dot bg-green" />
                                  <span className="mt=action-time">9:30-13:00</span>
                                </div>
                                <div className="mt-action-buttons ">
                                  <div className="btn-group btn-group-circle">
                                    <button type="button" className="btn btn-outline green btn-sm">Appove</button>
                                    <button type="button" className="btn btn-outline red btn-sm">Reject</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* END: Completed */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="portlet light portlet-fit bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-directions font-green hide" />
                      <span className="caption-subject bold font-dark uppercase "> Activities</span>
                      <span className="caption-helper">Horizontal Timeline</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group">
                        <a className="btn blue btn-outline btn-circle btn-sm" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Actions
                          <i className="fa fa-angle-down" />
                        </a>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <a href="javascript:;"> Action 1</a>
                          </li>
                          <li className="divider"> </li>
                          <li>
                            <a href="javascript:;">Action 2</a>
                          </li>
                          <li>
                            <a href="javascript:;">Action 3</a>
                          </li>
                          <li>
                            <a href="javascript:;">Action 4</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="cd-horizontal-timeline mt-timeline-horizontal">
                      <div className="timeline">
                        <div className="events-wrapper">
                          <div className="events">
                            <ol>
                              <li>
                                <a href="#0" data-date="16/01/2014" className="border-after-red bg-after-red selected">16 Jan</a>
                              </li>
                              <li>
                                <a href="#0" data-date="28/02/2014" className="border-after-red bg-after-red">28 Feb</a>
                              </li>
                              <li>
                                <a href="#0" data-date="20/04/2014" className="border-after-red bg-after-red">20 Mar</a>
                              </li>
                              <li>
                                <a href="#0" data-date="20/05/2014" className="border-after-red bg-after-red">20 May</a>
                              </li>
                              <li>
                                <a href="#0" data-date="09/07/2014" className="border-after-red bg-after-red">09 Jul</a>
                              </li>
                              <li>
                                <a href="#0" data-date="30/08/2014" className="border-after-red bg-after-red">30 Aug</a>
                              </li>
                              <li>
                                <a href="#0" data-date="15/09/2014" className="border-after-red bg-after-red">15 Sep</a>
                              </li>
                              <li>
                                <a href="#0" data-date="01/11/2014" className="border-after-red bg-after-red">01 Nov</a>
                              </li>
                              <li>
                                <a href="#0" data-date="10/12/2014" className="border-after-red bg-after-red">10 Dec</a>
                              </li>
                              <li>
                                <a href="#0" data-date="19/01/2015" className="border-after-red bg-after-red">29 Jan</a>
                              </li>
                              <li>
                                <a href="#0" data-date="03/03/2015" className="border-after-red bg-after-red">3 Mar</a>
                              </li>
                            </ol>
                            <span className="filling-line bg-red" aria-hidden="true" />
                          </div>
                          {/* .events */}
                        </div>
                        {/* .events-wrapper */}
                        <ul className="cd-timeline-navigation mt-ht-nav-icon">
                          <li>
                            <a href="#0" className="prev inactive btn btn-outline red md-skip">
                              <i className="fa fa-chevron-left" />
                            </a>
                          </li>
                          <li>
                            <a href="#0" className="next btn btn-outline red md-skip">
                              <i className="fa fa-chevron-right" />
                            </a>
                          </li>
                        </ul>
                        {/* .cd-timeline-navigation */}
                      </div>
                      {/* .timeline */}
                      <div className="events-content">
                        <ol>
                          <li className="selected" data-date="16/01/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">New User</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_3.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">16 January 2014 : 7:45 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, mi felis, aliquam at iaculis mi felis, aliquam
                                at iaculis finibus eu ex. Integer efficitur tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non est rhoncus volutpat.</p>
                              <a href="javascript:;" className="btn btn-circle red btn-outline">Read More</a>
                              <a href="javascript:;" className="btn btn-circle btn-icon-only blue">
                                <i className="fa fa-plus" />
                              </a>
                              <a href="javascript:;" className="btn btn-circle btn-icon-only green pull-right">
                                <i className="fa fa-twitter" />
                              </a>
                            </div>
                          </li>
                          <li data-date="28/02/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Sending Shipment</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_3.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Hugh Grant</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">28 February 2014 : 10:15 AM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle btn-outline green-jungle">Download Shipment List</a>
                              <div className="btn-group dropup pull-right">
                                <button className="btn btn-circle blue-steel dropdown-toggle" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false"> Actions
                                  <i className="fa fa-angle-down" />
                                </button>
                                <ul className="dropdown-menu pull-right" role="menu">
                                  <li>
                                    <a href="javascript:;">Action </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">Another action </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">Something else here </a>
                                  </li>
                                  <li className="divider"> </li>
                                  <li>
                                    <a href="javascript:;">Separated link </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li data-date="20/04/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Blue Chambray</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_1.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue">Rory Matthew</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">20 April 2014 : 10:45 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut. laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut. </p>
                              <a href="javascript:;" className="btn btn-circle red">Read More</a>
                            </div>
                          </li>
                          <li data-date="20/05/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">20 May 2014 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                          <li data-date="09/07/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Event Success</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_1.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Matt Goldman</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">9 July 2014 : 8:15 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde.</p>
                              <a href="javascript:;" className="btn btn-circle btn-outline purple-medium">View Summary</a>
                              <div className="btn-group dropup pull-right">
                                <button className="btn btn-circle green dropdown-toggle" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false"> Actions
                                  <i className="fa fa-angle-down" />
                                </button>
                                <ul className="dropdown-menu pull-right" role="menu">
                                  <li>
                                    <a href="javascript:;">Action </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">Another action </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">Something else here </a>
                                  </li>
                                  <li className="divider"> </li>
                                  <li>
                                    <a href="javascript:;">Separated link </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li data-date="30/08/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Conference Call</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_1.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Rory Matthew</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">30 August 2014 : 5:45 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <img className="timeline-body-img pull-left" src="../assets/pages/media/blog/5.jpg" alt />
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut. laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut. </p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut. laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut. </p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut. laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut. </p>
                              <a href="javascript:;" className="btn btn-circle red">Read More</a>
                            </div>
                          </li>
                          <li data-date="15/09/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Conference Decision</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_5.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Jessica Wolf</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">15 September 2014 : 8:30 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <img className="timeline-body-img pull-right" src="../assets/pages/media/blog/6.jpg" alt />
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut.</p>
                              <a href="javascript:;" className="btn btn-circle green-sharp">Read More</a>
                            </div>
                          </li>
                          <li data-date="01/11/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">1 November 2014 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                          <li data-date="10/12/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">10 December 2015 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                          <li data-date="19/01/2015">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">19 January 2015 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                          <li data-date="03/03/2015">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">3 March 2015 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                        </ol>
                      </div>
                      {/* .events-content */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="portlet light portlet-fit bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-directions font-green hide" />
                      <span className="caption-subject bold font-dark uppercase"> Events</span>
                      <span className="caption-helper">Horizontal Timeline</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group btn-group-devided" data-toggle="buttons">
                        <label className="btn green btn-outline btn-circle btn-sm active">
                          <input type="radio" name="options" className="toggle" id="option1" />Actions</label>
                        <label className="btn  green btn-outline btn-circle btn-sm">
                          <input type="radio" name="options" className="toggle" id="option2" />Tools</label>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="cd-horizontal-timeline mt-timeline-horizontal">
                      <div className="timeline mt-timeline-square">
                        <div className="events-wrapper">
                          <div className="events">
                            <ol>
                              <li>
                                <a href="#0" data-date="16/01/2014" className="border-after-blue bg-after-blue selected">Expo 2016</a>
                              </li>
                              <li>
                                <a href="#0" data-date="28/02/2014" className="border-after-blue bg-after-blue">New Promo</a>
                              </li>
                              <li>
                                <a href="#0" data-date="20/04/2014" className="border-after-blue bg-after-blue">Meeting</a>
                              </li>
                              <li>
                                <a href="#0" data-date="20/05/2014" className="border-after-blue bg-after-blue">Launch</a>
                              </li>
                              <li>
                                <a href="#0" data-date="09/07/2014" className="border-after-blue bg-after-blue">Party</a>
                              </li>
                              <li>
                                <a href="#0" data-date="30/08/2014" className="border-after-blue bg-after-blue">Reports</a>
                              </li>
                              <li>
                                <a href="#0" data-date="15/09/2014" className="border-after-blue bg-after-blue">HR</a>
                              </li>
                              <li>
                                <a href="#0" data-date="01/11/2014" className="border-after-blue bg-after-blue">IPO</a>
                              </li>
                              <li>
                                <a href="#0" data-date="10/12/2014" className="border-after-blue bg-after-blue">Board</a>
                              </li>
                              <li>
                                <a href="#0" data-date="19/01/2015" className="border-after-blue bg-after-blue">Revenue</a>
                              </li>
                              <li>
                                <a href="#0" data-date="03/03/2015" className="border-after-blue bg-after-blue">Dinner</a>
                              </li>
                            </ol>
                            <span className="filling-line bg-blue" aria-hidden="true" />
                          </div>
                          {/* .events */}
                        </div>
                        {/* .events-wrapper */}
                        <ul className="cd-timeline-navigation mt-ht-nav-icon">
                          <li>
                            <a href="#0" className="prev inactive btn blue md-skip">
                              <i className="fa fa-chevron-left" />
                            </a>
                          </li>
                          <li>
                            <a href="#0" className="next btn blue md-skip">
                              <i className="fa fa-chevron-right" />
                            </a>
                          </li>
                        </ul>
                        {/* .cd-timeline-navigation */}
                      </div>
                      {/* .timeline */}
                      <div className="events-content">
                        <ol>
                          <li className="selected" data-date="16/01/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Expo 2016 Launch</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Lisa Bold</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">23 February 2014</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod mi felis, aliquam at iaculis eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis mi felis, aliquam at
                                iaculis eu, onsectetur adipiscing elit finibus eu ex. Integer efficitur leo eget dolor tincidunt, et dignissim risus lacinia. Nam in egestas onsectetur adipiscing elit nunc. Suspendisse potenti</p>
                              <a href="javascript:;" className="btn btn-circle dark btn-outline">Read More</a>
                              <a href="javascript:;" className="btn btn-circle btn-icon-only green pull-right">
                                <i className="fa fa-twitter" />
                              </a>
                            </div>
                          </li>
                          <li data-date="28/02/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Sending Shipment</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_3.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Hugh Grant</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">28 February 2014 : 10:15 AM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle btn-outline green-jungle">Download Shipment List</a>
                              <div className="btn-group dropup pull-right">
                                <button className="btn btn-circle blue-steel dropdown-toggle" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false"> Actions
                                  <i className="fa fa-angle-down" />
                                </button>
                                <ul className="dropdown-menu pull-right" role="menu">
                                  <li>
                                    <a href="javascript:;">Action </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">Another action </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">Something else here </a>
                                  </li>
                                  <li className="divider"> </li>
                                  <li>
                                    <a href="javascript:;">Separated link </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li data-date="20/04/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Blue Chambray</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_1.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue">Rory Matthew</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">20 April 2014 : 10:45 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut. laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut. </p>
                              <a href="javascript:;" className="btn btn-circle red">Read More</a>
                            </div>
                          </li>
                          <li data-date="20/05/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">20 May 2014 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                          <li data-date="09/07/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Event Success</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_1.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Matt Goldman</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">9 July 2014 : 8:15 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde.</p>
                              <a href="javascript:;" className="btn btn-circle btn-outline purple-medium">View Summary</a>
                              <div className="btn-group dropup pull-right">
                                <button className="btn btn-circle green dropdown-toggle" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false"> Actions
                                  <i className="fa fa-angle-down" />
                                </button>
                                <ul className="dropdown-menu pull-right" role="menu">
                                  <li>
                                    <a href="javascript:;">Action </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">Another action </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">Something else here </a>
                                  </li>
                                  <li className="divider"> </li>
                                  <li>
                                    <a href="javascript:;">Separated link </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li data-date="30/08/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Conference Call</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_1.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Rory Matthew</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">30 August 2014 : 5:45 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <img className="timeline-body-img pull-left" src="../assets/pages/media/blog/5.jpg" alt />
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut. laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut. </p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut. laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut. </p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut. laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut. </p>
                              <a href="javascript:;" className="btn btn-circle red">Read More</a>
                            </div>
                          </li>
                          <li data-date="15/09/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Conference Decision</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_5.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Jessica Wolf</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">15 September 2014 : 8:30 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <img className="timeline-body-img pull-right" src="../assets/pages/media/blog/6.jpg" alt />
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
                                qui ut.</p>
                              <a href="javascript:;" className="btn btn-circle green-sharp">Read More</a>
                            </div>
                          </li>
                          <li data-date="01/11/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">1 November 2014 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                          <li data-date="10/12/2014">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">10 December 2014 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                          <li data-date="19/01/2015">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">19 January 2015 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                          <li data-date="03/03/2015">
                            <div className="mt-title">
                              <h2 className="mt-content-title">Timeline Received</h2>
                            </div>
                            <div className="mt-author">
                              <div className="mt-avatar">
                                <img src="../assets/pages/media/users/avatar80_2.jpg" />
                              </div>
                              <div className="mt-author-name">
                                <a href="javascript:;" className="font-blue-madison">Andres Iniesta</a>
                              </div>
                              <div className="mt-author-datetime font-grey-mint">3 March 2015 : 12:20 PM</div>
                            </div>
                            <div className="clearfix" />
                            <div className="mt-content border-grey-steel">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod eleifend ipsum, at posuere augue. Pellentesque mi felis, aliquam at iaculis eu, finibus eu ex. Integer efficitur leo eget dolor
                                tincidunt, et dignissim risus lacinia. Nam in egestas nunc. Suspendisse potenti. Cras ullamcorper tincidunt malesuada. Sed sit amet molestie elit, vel placerat ipsum. Ut consectetur odio non
                                est rhoncus volutpat. Nullam interdum, neque quis vehicula ornare, lacus elit dignissim purus, quis ultrices erat tortor eget felis. Cras commodo id massa at condimentum. Praesent dignissim luctus
                                risus sed sodales.</p>
                              <a href="javascript:;" className="btn btn-circle green-turquoise">Read More</a>
                            </div>
                          </li>
                        </ol>
                      </div>
                      {/* .events-content */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-share font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Recent Activities</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group">
                        <a className="btn btn-sm blue btn-outline btn-circle" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Filter By
                          <i className="fa fa-angle-down" />
                        </a>
                        <div className="dropdown-menu hold-on-click dropdown-checkboxes pull-right">
                          <label className="mt-checkbox mt-checkbox-outline">
                            <input type="checkbox" /> Finance
                            <span />
                          </label>
                          <label className="mt-checkbox mt-checkbox-outline">
                            <input type="checkbox" defaultChecked /> Membership
                            <span />
                          </label>
                          <label className="mt-checkbox mt-checkbox-outline">
                            <input type="checkbox" /> Customer Support
                            <span />
                          </label>
                          <label className="mt-checkbox mt-checkbox-outline">
                            <input type="checkbox" defaultChecked /> HR
                            <span />
                          </label>
                          <label className="mt-checkbox mt-checkbox-outline">
                            <input type="checkbox" /> System
                            <span />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="scroller" style={{height: 300}} data-always-visible={1} data-rail-visible={0}>
                      <ul className="feeds">
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-info">
                                  <i className="fa fa-check" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> You have 4 pending tasks.
                                  <span className="label label-sm label-warning "> Take action
                                    <i className="fa fa-share" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> Just now </div>
                          </div>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <div className="col1">
                              <div className="cont">
                                <div className="cont-col1">
                                  <div className="label label-sm label-success">
                                    <i className="fa fa-bar-chart-o" />
                                  </div>
                                </div>
                                <div className="cont-col2">
                                  <div className="desc"> Finance Report for year 2013 has been released. </div>
                                </div>
                              </div>
                            </div>
                            <div className="col2">
                              <div className="date"> 20 mins </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-danger">
                                  <i className="fa fa-user" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> You have 5 pending membership that requires a quick review. </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> 24 mins </div>
                          </div>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-info">
                                  <i className="fa fa-shopping-cart" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> New order received with
                                  <span className="label label-sm label-success"> Reference Number: DR23923 </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> 30 mins </div>
                          </div>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-success">
                                  <i className="fa fa-user" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> You have 5 pending membership that requires a quick review. </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> 24 mins </div>
                          </div>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-default">
                                  <i className="fa fa-bell-o" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> Web server hardware needs to be upgraded.
                                  <span className="label label-sm label-default "> Overdue </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> 2 hours </div>
                          </div>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <div className="col1">
                              <div className="cont">
                                <div className="cont-col1">
                                  <div className="label label-sm label-default">
                                    <i className="fa fa-briefcase" />
                                  </div>
                                </div>
                                <div className="cont-col2">
                                  <div className="desc"> IPO Report for year 2013 has been released. </div>
                                </div>
                              </div>
                            </div>
                            <div className="col2">
                              <div className="date"> 20 mins </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-info">
                                  <i className="fa fa-check" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> You have 4 pending tasks.
                                  <span className="label label-sm label-warning "> Take action
                                    <i className="fa fa-share" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> Just now </div>
                          </div>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <div className="col1">
                              <div className="cont">
                                <div className="cont-col1">
                                  <div className="label label-sm label-danger">
                                    <i className="fa fa-bar-chart-o" />
                                  </div>
                                </div>
                                <div className="cont-col2">
                                  <div className="desc"> Finance Report for year 2013 has been released. </div>
                                </div>
                              </div>
                            </div>
                            <div className="col2">
                              <div className="date"> 20 mins </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-default">
                                  <i className="fa fa-user" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> You have 5 pending membership that requires a quick review. </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> 24 mins </div>
                          </div>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-info">
                                  <i className="fa fa-shopping-cart" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> New order received with
                                  <span className="label label-sm label-success"> Reference Number: DR23923 </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> 30 mins </div>
                          </div>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-success">
                                  <i className="fa fa-user" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> You have 5 pending membership that requires a quick review. </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> 24 mins </div>
                          </div>
                        </li>
                        <li>
                          <div className="col1">
                            <div className="cont">
                              <div className="cont-col1">
                                <div className="label label-sm label-warning">
                                  <i className="fa fa-bell-o" />
                                </div>
                              </div>
                              <div className="cont-col2">
                                <div className="desc"> Web server hardware needs to be upgraded.
                                  <span className="label label-sm label-default "> Overdue </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col2">
                            <div className="date"> 2 hours </div>
                          </div>
                        </li>
                        <li>
                          <a href="javascript:;">
                            <div className="col1">
                              <div className="cont">
                                <div className="cont-col1">
                                  <div className="label label-sm label-info">
                                    <i className="fa fa-briefcase" />
                                  </div>
                                </div>
                                <div className="cont-col2">
                                  <div className="desc"> IPO Report for year 2013 has been released. </div>
                                </div>
                              </div>
                            </div>
                            <div className="col2">
                              <div className="date"> 20 mins </div>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="scroller-footer">
                      <div className="btn-arrow-link pull-right">
                        <a href="javascript:;">See All Records</a>
                        <i className="icon-arrow-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="portlet light tasks-widget bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-share font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Tasks</span>
                      <span className="caption-helper">tasks summary...</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group">
                        <a className="btn green btn-circle btn-sm" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> More
                          <i className="fa fa-angle-down" />
                        </a>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <a href="javascript:;"> All Project </a>
                          </li>
                          <li className="divider"> </li>
                          <li>
                            <a href="javascript:;"> AirAsia </a>
                          </li>
                          <li>
                            <a href="javascript:;"> Cruise </a>
                          </li>
                          <li>
                            <a href="javascript:;"> HSBC </a>
                          </li>
                          <li className="divider"> </li>
                          <li>
                            <a href="javascript:;"> Pending
                              <span className="badge badge-danger"> 4 </span>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;"> Completed
                              <span className="badge badge-success"> 12 </span>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;"> Overdue
                              <span className="badge badge-warning"> 9 </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a className="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title title> </a>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="task-content">
                      <div className="scroller" style={{height: 312}} data-always-visible={1} data-rail-visible1={1}>
                        {/* START TASK LIST */}
                        <ul className="task-list">
                          <li>
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> Present 2013 Year IPO Statistics at Board Meeting </span>
                              <span className="label label-sm label-success">Company</span>
                              <span className="task-bell">
                                <i className="fa fa-bell-o" />
                              </span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> Hold An Interview for Marketing Manager Position </span>
                              <span className="label label-sm label-danger">Marketing</span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> AirAsia Intranet System Project Internal Meeting </span>
                              <span className="label label-sm label-success">AirAsia</span>
                              <span className="task-bell">
                                <i className="fa fa-bell-o" />
                              </span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> Technical Management Meeting </span>
                              <span className="label label-sm label-warning">Company</span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> Kick-off Company CRM Mobile App Development </span>
                              <span className="label label-sm label-info">Internal Products</span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> Prepare Commercial Offer For SmartVision Website Rewamp </span>
                              <span className="label label-sm label-danger">SmartVision</span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> Sign-Off The Comercial Agreement With AutoSmart </span>
                              <span className="label label-sm label-default">AutoSmart</span>
                              <span className="task-bell">
                                <i className="fa fa-bell-o" />
                              </span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group dropup">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> Company Staff Meeting </span>
                              <span className="label label-sm label-success">Cruise</span>
                              <span className="task-bell">
                                <i className="fa fa-bell-o" />
                              </span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group dropup">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className="last-line">
                            <div className="task-checkbox">
                              <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" defaultValue={1} />
                                <span />
                              </label>
                            </div>
                            <div className="task-title">
                              <span className="task-title-sp"> KeenThemes Investment Discussion </span>
                              <span className="label label-sm label-warning">KeenThemes </span>
                            </div>
                            <div className="task-config">
                              <div className="task-config-btn btn-group dropup">
                                <a className="btn btn-sm default" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                  <i className="fa fa-cog" />
                                  <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu pull-right">
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-check" /> Complete </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-pencil" /> Edit </a>
                                  </li>
                                  <li>
                                    <a href="javascript:;">
                                      <i className="fa fa-trash-o" /> Cancel </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                        {/* END START TASK LIST */}
                      </div>
                    </div>
                    <div className="task-footer">
                      <div className="btn-arrow-link pull-right">
                        <a href="javascript:;">See All Records</a>
                        <i className="icon-arrow-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-cursor font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">General Stats</span>
                    </div>
                    <div className="actions">
                      <a href="javascript:;" className="btn btn-sm btn-circle red easy-pie-chart-reload">
                        <i className="fa fa-repeat" /> Reload </a>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="easy-pie-chart">
                          <div className="number transactions" data-percent={55}>
                            <span>+55</span>% </div>
                          <a className="title" href="javascript:;"> Transactions
                            <i className="icon-arrow-right" />
                          </a>
                        </div>
                      </div>
                      <div className="margin-bottom-10 visible-sm"> </div>
                      <div className="col-md-4">
                        <div className="easy-pie-chart">
                          <div className="number visits" data-percent={85}>
                            <span>+85</span>% </div>
                          <a className="title" href="javascript:;"> New Visits
                            <i className="icon-arrow-right" />
                          </a>
                        </div>
                      </div>
                      <div className="margin-bottom-10 visible-sm"> </div>
                      <div className="col-md-4">
                        <div className="easy-pie-chart">
                          <div className="number bounce" data-percent={46}>
                            <span>-46</span>% </div>
                          <a className="title" href="javascript:;"> Bounce
                            <i className="icon-arrow-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-equalizer font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Server Stats</span>
                      <span className="caption-helper">monthly stats...</span>
                    </div>
                    <div className="tools">
                      <a href className="collapse"> </a>
                      <a href="#portlet-config" data-toggle="modal" className="config"> </a>
                      <a href className="reload"> </a>
                      <a href className="remove"> </a>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="sparkline-chart">
                          <div className="number" id="sparkline_bar5" />
                          <a className="title" href="javascript:;"> Network
                            <i className="icon-arrow-right" />
                          </a>
                        </div>
                      </div>
                      <div className="margin-bottom-10 visible-sm"> </div>
                      <div className="col-md-4">
                        <div className="sparkline-chart">
                          <div className="number" id="sparkline_bar6" />
                          <a className="title" href="javascript:;"> CPU Load
                            <i className="icon-arrow-right" />
                          </a>
                        </div>
                      </div>
                      <div className="margin-bottom-10 visible-sm"> </div>
                      <div className="col-md-4">
                        <div className="sparkline-chart">
                          <div className="number" id="sparkline_line" />
                          <a className="title" href="javascript:;"> Load Rate
                            <i className="icon-arrow-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                {/* BEGIN REGIONAL STATS PORTLET*/}
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-share font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Regional Stats</span>
                    </div>
                    <div className="actions">
                      <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                        <i className="icon-cloud-upload" />
                      </a>
                      <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                        <i className="icon-wrench" />
                      </a>
                      <a className="btn btn-circle btn-icon-only btn-default fullscreen" data-container="false" data-placement="bottom" href="javascript:;"> </a>
                      <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                        <i className="icon-trash" />
                      </a>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div id="region_statistics_loading">
                      <img src="../assets/global/img/loading.gif" alt="loading" /> </div>
                    <div id="region_statistics_content" className="display-none">
                      <div className="btn-toolbar margin-bottom-10">
                        <div className="btn-group btn-group-circle" data-toggle="buttons">
                          <a href className="btn grey-salsa btn-sm active"> Users </a>
                          <a href className="btn grey-salsa btn-sm"> Orders </a>
                        </div>
                        <div className="btn-group pull-right">
                          <a href className="btn btn-circle grey-salsa btn-sm dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Select Region
                            <span className="fa fa-angle-down"> </span>
                          </a>
                          <ul className="dropdown-menu pull-right">
                            <li>
                              <a href="javascript:;" id="regional_stat_world"> World </a>
                            </li>
                            <li>
                              <a href="javascript:;" id="regional_stat_usa"> USA </a>
                            </li>
                            <li>
                              <a href="javascript:;" id="regional_stat_europe"> Europe </a>
                            </li>
                            <li>
                              <a href="javascript:;" id="regional_stat_russia"> Russia </a>
                            </li>
                            <li>
                              <a href="javascript:;" id="regional_stat_germany"> Germany </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div id="vmap_world" className="vmaps display-none"> </div>
                      <div id="vmap_usa" className="vmaps display-none"> </div>
                      <div id="vmap_europe" className="vmaps display-none"> </div>
                      <div id="vmap_russia" className="vmaps display-none"> </div>
                      <div id="vmap_germany" className="vmaps display-none"> </div>
                    </div>
                  </div>
                </div>
                {/* END REGIONAL STATS PORTLET*/}
              </div>
              <div className="col-md-6 col-sm-6">
                {/* BEGIN PORTLET*/}
                <div className="portlet light bordered">
                  <div className="portlet-title tabbable-line">
                    <div className="caption">
                      <i className="icon-globe font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Feeds</span>
                    </div>
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#tab_1_1" className="active" data-toggle="tab"> System </a>
                      </li>
                      <li>
                        <a href="#tab_1_2" data-toggle="tab"> Activities </a>
                      </li>
                    </ul>
                  </div>
                  <div className="portlet-body">
                    {/*BEGIN TABS*/}
                    <div className="tab-content">
                      <div className="tab-pane active" id="tab_1_1">
                        <div className="scroller" style={{height: 339}} data-always-visible={1} data-rail-visible={0}>
                          <ul className="feeds">
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-success">
                                      <i className="fa fa-bell-o" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> You have 4 pending tasks.
                                      <span className="label label-sm label-info"> Take action
                                        <i className="fa fa-share" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> Just now </div>
                              </div>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New version v1.4 just lunched! </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> 20 mins </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-danger">
                                      <i className="fa fa-bolt" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> Database server #12 overloaded. Please fix the issue. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 24 mins </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-info">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 30 mins </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-success">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 40 mins </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-warning">
                                      <i className="fa fa-plus" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New user registered. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 1.5 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-success">
                                      <i className="fa fa-bell-o" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> Web server hardware needs to be upgraded.
                                      <span className="label label-sm label-default "> Overdue </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 2 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-default">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 3 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-warning">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 5 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-info">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 18 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-default">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 21 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-info">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 22 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-default">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 21 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-info">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 22 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-default">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 21 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-info">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 22 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-default">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 21 hours </div>
                              </div>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-info">
                                      <i className="fa fa-bullhorn" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> New order received. Please take care of it. </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 22 hours </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="tab-pane" id="tab_1_2">
                        <div className="scroller" style={{height: 290}} data-always-visible={1} data-rail-visible1={1}>
                          <ul className="feeds">
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New user registered </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> Just now </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New order received </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> 10 mins </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <div className="col1">
                                <div className="cont">
                                  <div className="cont-col1">
                                    <div className="label label-sm label-danger">
                                      <i className="fa fa-bolt" />
                                    </div>
                                  </div>
                                  <div className="cont-col2">
                                    <div className="desc"> Order #24DOP4 has been rejected.
                                      <span className="label label-sm label-danger "> Take action
                                        <i className="fa fa-share" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col2">
                                <div className="date"> 24 mins </div>
                              </div>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New user registered </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> Just now </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New user registered </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> Just now </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New user registered </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> Just now </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New user registered </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> Just now </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New user registered </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> Just now </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New user registered </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> Just now </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:;">
                                <div className="col1">
                                  <div className="cont">
                                    <div className="cont-col1">
                                      <div className="label label-sm label-success">
                                        <i className="fa fa-bell-o" />
                                      </div>
                                    </div>
                                    <div className="cont-col2">
                                      <div className="desc"> New user registered </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col2">
                                  <div className="date"> Just now </div>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/*END TABS*/}
                  </div>
                </div>
                {/* END PORTLET*/}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                {/* BEGIN PORTLET*/}
                <div className="portlet light calendar bordered">
                  <div className="portlet-title ">
                    <div className="caption">
                      <i className="icon-calendar font-dark hide" />
                      <span className="caption-subject font-dark bold uppercase">Feeds</span>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div id="calendar"> </div>
                  </div>
                </div>
                {/* END PORTLET*/}
              </div>
              <div className="col-md-6 col-sm-6">
                {/* BEGIN PORTLET*/}
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-bubble font-hide hide" />
                      <span className="caption-subject font-hide bold uppercase">Chats</span>
                    </div>
                    <div className="actions">
                      <div className="portlet-input input-inline">
                        <div className="input-icon right">
                          <i className="icon-magnifier" />
                          <input type="text" className="form-control input-circle" placeholder="search..." /> </div>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body" id="chats">
                    <div className="scroller" style={{height: 525}} data-always-visible={1} data-rail-visible1={1}>
                      <ul className="chats">
                        <li className="out">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar2.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Lisa Wong </a>
                            <span className="datetime"> at 20:11 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                          </div>
                        </li>
                        <li className="out">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar2.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Lisa Wong </a>
                            <span className="datetime"> at 20:11 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                          </div>
                        </li>
                        <li className="in">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar1.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Bob Nilson </a>
                            <span className="datetime"> at 20:30 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                          </div>
                        </li>
                        <li className="in">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar1.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Bob Nilson </a>
                            <span className="datetime"> at 20:30 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                          </div>
                        </li>
                        <li className="out">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar3.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Richard Doe </a>
                            <span className="datetime"> at 20:33 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                          </div>
                        </li>
                        <li className="in">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar3.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Richard Doe </a>
                            <span className="datetime"> at 20:35 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                          </div>
                        </li>
                        <li className="out">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar1.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Bob Nilson </a>
                            <span className="datetime"> at 20:40 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                          </div>
                        </li>
                        <li className="in">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar3.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Richard Doe </a>
                            <span className="datetime"> at 20:40 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </span>
                          </div>
                        </li>
                        <li className="out">
                          <img className="avatar" alt src="../assets/layouts/layout/img/avatar1.jpg" />
                          <div className="message">
                            <span className="arrow"> </span>
                            <a href="javascript:;" className="name"> Bob Nilson </a>
                            <span className="datetime"> at 20:54 </span>
                            <span className="body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. sed diam nonummy nibh euismod tincidunt ut laoreet. </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="chat-form">
                      <div className="input-cont">
                        <input className="form-control" type="text" placeholder="Type a message here..." /> </div>
                      <div className="btn-cont">
                        <span className="arrow"> </span>
                        <a href className="btn blue icn-only">
                          <i className="fa fa-check icon-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END PORTLET*/}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="portlet light bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-bubble font-dark hide" />
                      <span className="caption-subject font-hide bold uppercase">Recent Users</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group">
                        <a className="btn green-haze btn-outline btn-circle btn-sm" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Actions
                          <i className="fa fa-angle-down" />
                        </a>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <a href="javascript:;"> Option 1</a>
                          </li>
                          <li className="divider"> </li>
                          <li>
                            <a href="javascript:;">Option 2</a>
                          </li>
                          <li>
                            <a href="javascript:;">Option 3</a>
                          </li>
                          <li>
                            <a href="javascript:;">Option 4</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-md-4">
                        {/*begin: widget 1-1 */}
                        <div className="mt-widget-1">
                          <div className="mt-icon">
                            <a href="#">
                              <i className="icon-plus" />
                            </a>
                          </div>
                          <div className="mt-img">
                            <img src="../assets/pages/media/users/avatar80_8.jpg" /> </div>
                          <div className="mt-body">
                            <h3 className="mt-username">Diana Ellison</h3>
                            <p className="mt-user-title"> Lorem Ipsum is simply dummy text. </p>
                            <div className="mt-stats">
                              <div className="btn-group btn-group btn-group-justified">
                                <a href="javascript:;" className="btn font-red">
                                  <i className="icon-bubbles" /> 1,7k </a>
                                <a href="javascript:;" className="btn font-green">
                                  <i className="icon-social-twitter" /> 2,6k </a>
                                <a href="javascript:;" className="btn font-yellow">
                                  <i className="icon-emoticon-smile" /> 3,7k </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*end: widget 1-1 */}
                      </div>
                      <div className="col-md-4">
                        {/*begin: widget 1-2 */}
                        <div className="mt-widget-1">
                          <div className="mt-icon">
                            <a href="#">
                              <i className="icon-plus" />
                            </a>
                          </div>
                          <div className="mt-img">
                            <img src="../assets/pages/media/users/avatar80_7.jpg" /> </div>
                          <div className="mt-body">
                            <h3 className="mt-username">Jason Baker</h3>
                            <p className="mt-user-title"> Lorem Ipsum is simply dummy text. </p>
                            <div className="mt-stats">
                              <div className="btn-group btn-group btn-group-justified">
                                <a href="javascript:;" className="btn font-yellow">
                                  <i className="icon-bubbles" /> 1,7k </a>
                                <a href="javascript:;" className="btn font-blue">
                                  <i className="icon-social-twitter" /> 2,6k </a>
                                <a href="javascript:;" className="btn font-green">
                                  <i className="icon-emoticon-smile" /> 3,7k </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*end: widget 1-2 */}
                      </div>
                      <div className="col-md-4">
                        {/*begin: widget 1-3 */}
                        <div className="mt-widget-1">
                          <div className="mt-icon">
                            <a href="#">
                              <i className="icon-plus" />
                            </a>
                          </div>
                          <div className="mt-img">
                            <img src="../assets/pages/media/users/avatar80_6.jpg" /> </div>
                          <div className="mt-body">
                            <h3 className="mt-username">Julia Berry</h3>
                            <p className="mt-user-title"> Lorem Ipsum is simply dummy text. </p>
                            <div className="mt-stats">
                              <div className="btn-group btn-group btn-group-justified">
                                <a href="javascript:;" className="btn font-yellow">
                                  <i className="icon-bubbles" /> 1,7k </a>
                                <a href="javascript:;" className="btn font-red">
                                  <i className="icon-social-twitter" /> 2,6k </a>
                                <a href="javascript:;" className="btn font-green">
                                  <i className="icon-emoticon-smile" /> 3,7k </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*end: widget 1-3 */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="portlet light portlet-fit bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-microphone font-dark hide" />
                      <span className="caption-subject bold font-dark uppercase"> Recent Works</span>
                      <span className="caption-helper">default option...</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group btn-group-devided" data-toggle="buttons">
                        <label className="btn red btn-outline btn-circle btn-sm active">
                          <input type="radio" name="options" className="toggle" id="option1" />Settings</label>
                        <label className="btn  red btn-outline btn-circle btn-sm">
                          <input type="radio" name="options" className="toggle" id="option2" />Tools</label>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mt-widget-2">
                          <div className="mt-head" style={{backgroundImage: 'url(../assets/pages/img/background/32.jpg)'}}>
                            <div className="mt-head-label">
                              <button type="button" className="btn btn-success">Manhattan</button>
                            </div>
                            <div className="mt-head-user">
                              <div className="mt-head-user-img">
                                <img src="../assets/pages/img/avatars/team7.jpg" /> </div>
                              <div className="mt-head-user-info">
                                <span className="mt-user-name">Chris Jagers</span>
                                <span className="mt-user-time">
                                  <i className="icon-emoticon-smile" /> 3 mins ago </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-body">
                            <h3 className="mt-body-title"> Thomas Clark </h3>
                            <p className="mt-body-description"> It is a long established fact that a reader will be distracted </p>
                            <ul className="mt-body-stats">
                              <li className="font-green">
                                <i className="icon-emoticon-smile" /> 3,7k</li>
                              <li className="font-yellow">
                                <i className=" icon-social-twitter" /> 3,7k</li>
                              <li className="font-red">
                                <i className="  icon-bubbles" /> 3,7k</li>
                            </ul>
                            <div className="mt-body-actions">
                              <div className="btn-group btn-group btn-group-justified">
                                <a href="javascript:;" className="btn">
                                  <i className="icon-bubbles" /> Bookmark </a>
                                <a href="javascript:;" className="btn ">
                                  <i className="icon-social-twitter" /> Share </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mt-widget-2">
                          <div className="mt-head" style={{backgroundImage: 'url(../assets/pages/img/background/43.jpg)'}}>
                            <div className="mt-head-label">
                              <button type="button" className="btn btn-danger">London</button>
                            </div>
                            <div className="mt-head-user">
                              <div className="mt-head-user-img">
                                <img src="../assets/pages/img/avatars/team3.jpg" /> </div>
                              <div className="mt-head-user-info">
                                <span className="mt-user-name">Harry Harris</span>
                                <span className="mt-user-time">
                                  <i className="icon-user" /> 3 mins ago </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-body">
                            <h3 className="mt-body-title"> Christian Davidson </h3>
                            <p className="mt-body-description"> It is a long established fact that a reader will be distracted </p>
                            <ul className="mt-body-stats">
                              <li className="font-green">
                                <i className="icon-emoticon-smile" /> 3,7k</li>
                              <li className="font-yellow">
                                <i className=" icon-social-twitter" /> 3,7k</li>
                              <li className="font-red">
                                <i className="  icon-bubbles" /> 3,7k</li>
                            </ul>
                            <div className="mt-body-actions">
                              <div className="btn-group btn-group btn-group-justified">
                                <a href="javascript:;" className="btn ">
                                  <i className="icon-bubbles" /> Bookmark </a>
                                <a href="javascript:;" className="btn ">
                                  <i className="icon-social-twitter" /> Share </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="portlet light portlet-fit bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-microphone font-dark hide" />
                      <span className="caption-subject bold font-dark uppercase"> Recent Projects</span>
                      <span className="caption-helper">default option...</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group btn-group-devided" data-toggle="buttons">
                        <label className="btn blue btn-outline btn-circle btn-sm active">
                          <input type="radio" name="options" className="toggle" id="option1" />Actions</label>
                        <label className="btn  blue btn-outline btn-circle btn-sm">
                          <input type="radio" name="options" className="toggle" id="option2" />Tools</label>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mt-widget-4">
                          <div className="mt-img-container">
                            <img src="../assets/pages/img/background/34.jpg" /> </div>
                          <div className="mt-container bg-purple-opacity">
                            <div className="mt-head-title"> Website Revamp &amp; Deployment </div>
                            <div className="mt-body-icons">
                              <a href="#">
                                <i className=" icon-pencil" />
                              </a>
                              <a href="#">
                                <i className=" icon-map" />
                              </a>
                              <a href="#">
                                <i className=" icon-trash" />
                              </a>
                            </div>
                            <div className="mt-footer-button">
                              <button type="button" className="btn btn-circle btn-danger btn-sm">Dior</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mt-widget-4">
                          <div className="mt-img-container">
                            <img src="../assets/pages/img/background/46.jpg" /> </div>
                          <div className="mt-container bg-green-opacity">
                            <div className="mt-head-title"> CRM Development &amp; Deployment </div>
                            <div className="mt-body-icons">
                              <a href="#">
                                <i className=" icon-social-twitter" />
                              </a>
                              <a href="#">
                                <i className=" icon-bubbles" />
                              </a>
                              <a href="#">
                                <i className=" icon-bell" />
                              </a>
                            </div>
                            <div className="mt-footer-button">
                              <button type="button" className="btn btn-circle blue-ebonyclay btn-sm">Nike</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mt-widget-4">
                          <div className="mt-img-container">
                            <img src="../assets/pages/img/background/37.jpg" /> </div>
                          <div className="mt-container bg-dark-opacity">
                            <div className="mt-head-title"> Marketing Campaigns </div>
                            <div className="mt-body-icons">
                              <a href="#">
                                <i className=" icon-bubbles" />
                              </a>
                              <a href="#">
                                <i className=" icon-map" />
                              </a>
                              <a href="#">
                                <i className=" icon-cup" />
                              </a>
                            </div>
                            <div className="mt-footer-button">
                              <button type="button" className="btn btn-circle btn-success btn-sm">Honda</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="portlet light portlet-fit bordered">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className="icon-microphone font-dark hide" />
                      <span className="caption-subject bold font-dark uppercase"> Activities</span>
                      <span className="caption-helper">default option...</span>
                    </div>
                    <div className="actions">
                      <div className="btn-group">
                        <a className="btn red btn-outline btn-circle btn-sm" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Actions
                          <i className="fa fa-angle-down" />
                        </a>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <a href="javascript:;"> Option 1</a>
                          </li>
                          <li className="divider"> </li>
                          <li>
                            <a href="javascript:;">Option 2</a>
                          </li>
                          <li>
                            <a href="javascript:;">Option 3</a>
                          </li>
                          <li>
                            <a href="javascript:;">Option 4</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mt-widget-3">
                          <div className="mt-head bg-blue-hoki">
                            <div className="mt-head-icon">
                              <i className=" icon-social-twitter" />
                            </div>
                            <div className="mt-head-desc"> Lorem Ipsum is simply dummy text of the ... </div>
                            <span className="mt-head-date"> 25 Jan, 2015 </span>
                            <div className="mt-head-button">
                              <button type="button" className="btn btn-circle btn-outline white btn-sm">Add</button>
                            </div>
                          </div>
                          <div className="mt-body-actions-icons">
                            <div className="btn-group btn-group btn-group-justified">
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-align-justify" />
                                </span>RECORD </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-camera" />
                                </span>PHOTO </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-calendar" />
                                </span>DATE </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-record" />
                                </span>RANC </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mt-widget-3">
                          <div className="mt-head bg-red">
                            <div className="mt-head-icon">
                              <i className="icon-user" />
                            </div>
                            <div className="mt-head-desc"> Lorem Ipsum is simply dummy text of the ... </div>
                            <span className="mt-head-date"> 12 Feb, 2016 </span>
                            <div className="mt-head-button">
                              <button type="button" className="btn btn-circle btn-outline white btn-sm">Add</button>
                            </div>
                          </div>
                          <div className="mt-body-actions-icons">
                            <div className="btn-group btn-group btn-group-justified">
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-align-justify" />
                                </span>RECORD </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-camera" />
                                </span>PHOTO </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-calendar" />
                                </span>DATE </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-record" />
                                </span>RANC </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mt-widget-3">
                          <div className="mt-head bg-green">
                            <div className="mt-head-icon">
                              <i className=" icon-graduation" />
                            </div>
                            <div className="mt-head-desc"> Lorem Ipsum is simply dummy text of the ... </div>
                            <span className="mt-head-date"> 3 Mar, 2015 </span>
                            <div className="mt-head-button">
                              <button type="button" className="btn btn-circle btn-outline white btn-sm">Add</button>
                            </div>
                          </div>
                          <div className="mt-body-actions-icons">
                            <div className="btn-group btn-group btn-group-justified">
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-align-justify" />
                                </span>RECORD </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-camera" />
                                </span>PHOTO </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-calendar" />
                                </span>DATE </a>
                              <a href="javascript:;" className="btn ">
                                <span className="mt-icon">
                                  <i className="glyphicon glyphicon-record" />
                                </span>RANC </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END CONTENT BODY */}
        </div>

      </div>
    );
  }
}
