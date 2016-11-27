import * as axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {FormattedMessage,injectIntl} from 'react-intl'
import {Provider, connect} from 'react-redux';
import {Bar, Pie, Doughnut} from 'react-chartjs-2';
import * as ChartJS from 'chart.js';
import defaultColors from './../general/colors';
import {push} from 'react-router-redux';
import homeActions from './../../actions/home';
import * as randomMC from 'random-material-color';


function mapStateToProps(props) {
    console.log(props);
    return {
        home: props.home
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch: () => dispatch(homeActions.fetch()),
        dispatch
    };
}

class HomeIndex extends Component {
    constructor(props) {
        super(props);

    };

    componentWillMount() {
        this.props.fetch();
    }

    perGroupAnswersChart() {
        var graphData = {
            labels: [],
            datasets: []
        }

        _.forEach(this.props.home.data, (elem) => {
            let label = `${elem.grade} - ${elem.year}`;
            // graphData.labels.push(label);
            var dataset = {
                label: label,
                data: [elem.totalAnswers],
                backgroundColor: [randomMC.getColor()],
            };

            graphData.datasets.push(dataset);
        });

        return (
            <div>
                <h3 className='text-center'><FormattedMessage id="home.group.overviewAnswers"/></h3>
                <Bar data={graphData} />
            </div>
        );
    }

    perGroupChart() {
        var graphData = {
            labels: [this.props.intl.messages['home.correctAnswers'], this.props.intl.messages['home.totalAnswers']],
            datasets: []
        };

        var correctDataSet = {
            label: this.props.intl.messages['home.correctAnswers'],
            backgroundColor: [],
            data: []
        }
        var totalDataSet = {
            label: this.props.intl.messages['home.totalAnswers'],
            backgroundColor: [],
            data: []
        }

        _.forEach(this.props.home.data, (elem) => {
            let label = `${elem.grade} - ${elem.year}`;
            let color = randomMC.getColor();
            var dataset = {
                label,
                data: [elem.correctAnswers, elem.totalAnswers- elem.correctAnswers],
                backgroundColor: [color,color]
            }

            graphData.datasets.push(dataset);
            correctDataSet.data.push(elem.correctAnswers);
            totalDataSet.data.push(elem.totalAnswers);
            correctDataSet.backgroundColor.push("#8BC34A");
            totalDataSet.backgroundColor.push("#F44336");
        });

        // graphData.datasets = [correctDataSet, totalDataSet];

        return (
            <div>
                <h3 className='text-center'><FormattedMessage id="home.group.overview"/></h3>
                <Bar data={graphData} options={{ scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                            // OR //
                            beginAtZero: true   // minimum value will be 0.
                        }
                    }]
                }}}/>
            </div>
        );
    }

    renderGraphs() {
        if(this.props.home.status === 'SUCCESS') {
            return (
                <div className='padded-content'>
                    <h3><FormattedMessage id='home.title'/> </h3>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-xs-12 col-md-6'>
                                {this.perGroupAnswersChart()}
                            </div>
                            <div className='col-xs-12 col-md-6'>
                                {this.perGroupChart()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.props.home.status === 'LOADING') {
            return (
                <div>
                    <p>
                        <FormattedMessage id='generator.loading'/>
                    </p>
                </div>
            )
        }
        else if(this.props.home.status === 'FAILURE') {
            return (
                <div>
                    <p>
                        <FormattedMessage id='generator.error.title'/>
                    </p>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderGraphs()}
            </div>
        );
    }
};

export const HomeIndexModule = connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeIndex));
