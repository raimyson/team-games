import React, { Component, lazy, Suspense } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { css } from 'styled-components';

import ColorUtil from '../../utils/ColorUtil';
const Widget04 = lazy(() => import('../Widgets/Widget04'));


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.selectColor = ColorUtil.selectColor;
    this.toggleProgram = this.toggleProgram.bind(this);

    this.state = {
      fadeIn: true,
      timeout: 300,
      programCollapse: true,
      program: [
        {
          "idProgram": 1,
          "name": "Minha Oi 3.0"
        },
        {
          "idProgram": 2,
          "name": "Minha Oi 2.0"
        },
        {
          "idProgram": 3,
          "name": "E-Billing 1.0"
        },
        {
          "idProgram": 4,
          "name": "E-Billing 3.0"
        }
      ]
    };
  }

  toggleProgram() {
    this.setState({ programCollapse: !this.state.programCollapse });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">

        <Row style={{ display: 'inline' }}>
          <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
            <Card >
              <CardHeader>
                <b>PROGRAM</b>
                <div className="card-header-actions">
                  {/*eslint-disable-next-line*/}
                  {/*<a href="#" className="card-header-action btn btn-setting"><i className="icon-settings"></i></a>*/}
                  {/*eslint-disable-next-line*/}
                  <a className="card-header-action btn btn-minimize" data-target="#collapseProgram" onClick={this.toggleProgram}><i className="icon-arrow-up"></i></a>
                  {/*eslint-disable-next-line*/}
                  {/*<a className="card-header-action btn btn-close" onClick={this.toggleFade}><i className="icon-close"></i></a>*/}
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.programCollapse} id="collapseProgram">
                <CardBody>
                  <Row>
                    {
                      this.state.program.map((program, index) => {
                        return (
                          <Col sm="6" md="2">
                            <Link to={"/program/"+program.idProgram} className="nav-link">
                              <Widget04 icon="fa fa-home" color={this.selectColor(5+index)} header={program.name} value="100" invert>Server: {program.idProgram}</Widget04>
                            </Link>
                          </Col>
                        )
                      })
                    }
                  </Row>
                </CardBody>
              </Collapse>
            </Card>
          </Fade>
        </Row>

      </div>
    );
  }
}

export default Dashboard;
