import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import {
  Card,
  CardText,
  CardTitle,
  Button
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  smallText: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  buttonName: PropTypes.string,
};

const defaultProps = {
  mainText: 'Lorem ipsum...',
  smallText: 'Lorem ipsum dolor sit amet enim.',
  // color: '',
  value: '25',
};

class SmallCard extends Component {
  render() {
    const { className, cssModule, icon, mainText, smallText, buttonName, color, onClick, ...attributes } = this.props;

    // demo purposes only
    const progress = { style: '', color: color };
    const card = { style: '', bgColor: '' };

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames('progress-xs my-3', progress.style);

    return (
      <Card body className={classes} {...attributes}>
        <CardTitle>{icon}
          <h4>
            <FormattedMessage id={mainText} />
          </h4>
        </CardTitle>
        <CardText><FormattedMessage id={smallText} /></CardText>
        <Button onClick={() => this.props.onClick()} ><FormattedMessage id={buttonName} /></Button>
      </Card>
    );
  }
}

SmallCard.propTypes = propTypes;
SmallCard.defaultProps = defaultProps;

export default SmallCard;
