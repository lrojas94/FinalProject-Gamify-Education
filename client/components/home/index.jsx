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
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';




function mapStateToProps(props) {
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
        this.groupChartsData = {};

        this.state = {
            groupDifficulty: '',
            groupTopic: ''
        }

        if(this.props.home.status === 'SUCCESS') {
            // here we go
            this.preparePerGroupTopicAndDifficultyChart();
        }
    };

    componentWillMount() {
        this.props.fetch();
    }

    componentWillReceiveProps(props) {
        if(props.home.status === 'SUCCESS') {
            this.props = props;
            this.preparePerGroupTopicAndDifficultyChart();
        }
    }

    preparePerGroupTopicAndDifficultyChart() {
        this.groupOptions = [];
        this.groupColors = {};
        this.perGroupCorrectVsWrongChart = {
            labels: [this.props.intl.messages['home.correctAnswers'], this.props.intl.messages['home.totalAnswers']],
            datasets: []
        };

        this.perGroupTotalAnswersChart = {
            labels: [],
            datasets: []
        };

        _.forEach(this.props.home.data, (elem) => {
            // let's do so:
            var groupTitle = `${elem.grade} - ${elem.year}`;
            this.groupColors[groupTitle] = randomMC.getColor();
            this.groupOptions.push({
                value: groupTitle,
                label: groupTitle
            });
            // per group chart correct vs incorrect char:
            this.perGroupCorrectVsWrongChart.datasets.push({
                label: groupTitle,
                data: [elem.correctAnswers, elem.totalAnswers - elem.correctAnswers],
                backgroundColor: [this.groupColors[groupTitle],this.groupColors[groupTitle]]
            });
            // per group total chart:
            this.perGroupTotalAnswersChart.datasets.push({
                label: groupTitle,
                data: [elem.totalAnswers],
                backgroundColor: [this.groupColors[groupTitle]],
            });

            var topicGraphData= {
                labels: [this.props.intl.messages['home.correctAnswers'], this.props.intl.messages['home.totalAnswers']],
                datasets: [], // 1 datasets per topic.
            }

            var difficultyGraphData= {
                labels: [this.props.intl.messages['home.correctAnswers'], this.props.intl.messages['home.totalAnswers']],
                datasets: [], // 1 datasets per topic.
            }

            _.forEach((elem.topics), (topic) => {
                // add those dataset
                let color = randomMC.getColor();
                let label = topic.name;
                topicGraphData.datasets.push({
                    label,
                    backgroundColor: [color, color],
                    data: [topic.correctAnswers, topic.totalAnswers - topic.correctAnswers]
                });
            });

            _.forEach((elem.difficulties), (difficulty) => {
                // add those dataset
                let color = randomMC.getColor();
                let label = difficulty.name;
                difficultyGraphData.datasets.push({
                    label,
                    backgroundColor: [color, color],
                    data: [difficulty.correctAnswers, difficulty.totalAnswers - difficulty.correctAnswers]
                });
            });

            this.groupChartsData[groupTitle] = {
                topic: topicGraphData,
                difficulty: difficultyGraphData,
            };
        });
    }

    onChangeTopicGraphGroup(elem) {
        console.log(elem);
        this.setState({
            groupTopic : elem.value
        });
    }
    onChangeDifficultyGraphGroup(elem) {
        this.setState({
            groupDifficulty : elem.value
        });
    }

    perTopicOfGroupChart() {
        return (
            <div>
                <h3> <FormattedMessage id='home.topics.per.group'/> </h3>
                <ReactSelect options={this.groupOptions}
                    name="irrelevant"
                    placeholder={this.props.intl.messages['home.topics.placeholder']}
                    value={this.state.groupTopic}
                    onChange={this.onChangeTopicGraphGroup.bind(this)}
                />
                {this.state.groupTopic ? (
                    <Bar data={this.groupChartsData[this.state.groupTopic].topic}
                        options={{ scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                    // OR //
                                    beginAtZero: true   // minimum value will be 0.
                                }
                            }]
                        }}}/>
                ): ""}
            </div>
        )
    }

    perDifficultyOfGroupChart() {
        return (
            <div>
                <h3> <FormattedMessage id='home.difficulties.per.group'/> </h3>
                <ReactSelect options={this.groupOptions}
                    name="irrelevant"
                    placeholder={this.props.intl.messages['home.difficulties.placeholder']}
                    value={this.state.groupDifficulty}
                    onChange={this.onChangeDifficultyGraphGroup.bind(this)}
                />
                {this.state.groupDifficulty ? (
                    <Bar data={this.groupChartsData[this.state.groupDifficulty].difficulty}
                        options={{ scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                    // OR //
                                    beginAtZero: true   // minimum value will be 0.
                                }
                            }]
                        }}}/>
                ): ""}
            </div>
        )
    }

    perGroupAnswersChart() {

        return (
            <div>
                <h3 className='text-center'><FormattedMessage id="home.group.overviewAnswers"/></h3>
                <Bar data={this.perGroupTotalAnswersChart} options={{ scales: {
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

    perGroupChart() {
        return (
            <div>
                <h3 className='text-center'><FormattedMessage id="home.group.overview"/></h3>
                <Bar data={this.perGroupCorrectVsWrongChart} options={{ scales: {
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
                        <div className='row'>
                            <div className='col-xs-12'>
                                {this.perTopicOfGroupChart()}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xs-12'>
                                {this.perDifficultyOfGroupChart()}
                            </div>
                        </div>
                        <div className='pad-me'></div>
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
