import React from 'react'
import '../../css/admin/DashboardHome.css'
import PieChart from '../../static/images/Pie Chart.png'
import BarGraph from '../../static/images/Sample Graph.png'
const DashboardHome = () => {
  return (
    <div class="admin-dashboard-home">
        <div class="card-containers">
            <div class="info-cards">
                <h3>Overview</h3>
                <div class="main-content">
                    <div class="card-field">
                        <div class="card-label-text">Employee Count:</div>
                        <div class="card-label-value">89</div>
                    </div>
                    <div class="card-field">
                        <div class="card-label-text">Mentorship Rate :</div>
                        <div class="card-label-value">30%</div>
                    </div>
                    <div class="card-field">
                        <div class="card-label-text">Average amdocs experience :</div>
                        <div class="card-label-value">6.5 years</div>
                    </div>
                    <div class="card-field">
                        <div class="card-label-text">Average total experience :</div>
                        <div class="card-label-value">5.4 years</div>
                    </div>
                </div>
            </div>
            <div class="info-cards">
                <h3>Skills and Expertise</h3>
                <div class="main-content">
                    <div class="card-field">
                        <div class="card-label-text">Trending Primary Skill: </div>
                        <div class="card-label-value">Java</div>
                    </div>
                    <div class="card-field">
                        <div class="card-label-text">Trending Secondary Skill: </div>
                        <div class="card-label-value">MySQL</div>
                    </div>
                    <div class="card-field">
                        <div class="card-label-text">Presentation Skill(Rate):</div>
                        <div class="card-label-value">4.2</div>
                    </div>
                    <div class="card-field">
                        <div class="card-label-text">DevOps Knowledge::</div>
                        <div class="card-label-value">4.4</div>
                    </div>
                </div>
            </div>
            <div class="info-cards">
                <h3>Domain Knowledge</h3>
                <div class="main-content">
                    <div class="card-field">
                        <div class="card-label-text">Percentage of Employees Interested in Exploring New Tools/Tech</div>
                        <div class="card-label-value">89%</div>
                    </div>
                    <div class="card-field">
                        <div class="card-label-text">Percentage of Employees Contributing to Innovation or Tool Exploration</div>
                        <div class="card-label-value">6.5%</div>
                    </div>
                   
                </div>
            </div>
            
        </div>
        
        <div class="graph-containers">
            <div class="graph-box">
                <img src={PieChart} alt="" />
            </div>
            <div class="graph-box">
                <img src={BarGraph} alt="" />
            </div>
        </div>
        <div class="long-card-containers">
            <div class="info-cards">
                20%, 37% and 41% of Employees are specialized in Key Product/Subdomains CRM, Billing Systems, Cloud Products respectively.
            </div>
        </div>
    </div>
  )
}

export default DashboardHome