// @flow strict
import type { Node } from 'react';

import { PureComponent } from 'react';
import Box from './Box.js';
import styles from './Video.css';

type Props = {|
  currentTime: number,
  duration: number,
  onPlayheadDown: (event: SyntheticMouseEvent<HTMLDivElement>) => void,
  onPlayheadUp: (event: SyntheticMouseEvent<HTMLDivElement>) => void,
  seek: (time: number) => void,
|};

type State = {|
  seeking: boolean,
|};

export default class VideoPlayhead extends PureComponent<Props, State> {
  playhead: ?HTMLDivElement;

  state: State = {
    seeking: false,
  };

  setPlayheadRef: (ref: ?HTMLDivElement) => void = (ref) => {
    this.playhead = ref;
  };

  seek: (clientX: number) => void = (clientX) => {
    if (this.playhead) {
      const { duration, seek } = this.props;
      const { left, width } = this.playhead.getBoundingClientRect();
      const percent = Math.max(0, Math.min((clientX - left) / width, 1));
      const newTime = percent * duration;
      seek(newTime);
    }
  };

  stopClick: (event: SyntheticEvent<HTMLDivElement>) => void = (event) => event.stopPropagation();

  handleMouseDown: (event: SyntheticMouseEvent<HTMLDivElement>) => void = (event) => {
    event.preventDefault();
    const { onPlayheadDown } = this.props;
    onPlayheadDown(event);
    this.setState({ seeking: true });
    this.seek(event.clientX);
  };

  handleMouseLeave: (event: SyntheticMouseEvent<HTMLDivElement>) => void = (event) => {
    const { onPlayheadUp } = this.props;
    const { seeking } = this.state;
    // If the user is seeking and mouse leaves playhead then end the seek
    if (seeking) {
      this.setState({ seeking: false });
      onPlayheadUp(event);
    }
  };

  handleMouseMove: (event: SyntheticMouseEvent<HTMLDivElement>) => void = (event) => {
    event.preventDefault();
    const { seeking } = this.state;
    if (seeking) {
      this.seek(event.clientX);
    }
  };

  handleMouseUp: (event: SyntheticMouseEvent<HTMLDivElement>) => void = (event) => {
    const { onPlayheadUp } = this.props;
    this.setState({ seeking: false });
    onPlayheadUp(event);
  };

  render(): Node {
    const { currentTime, duration } = this.props;
    const width = `${Math.floor((currentTime * 10000) / duration) / 100}%`;
    return (
      <Box position="relative" display="flex" flex="grow" alignItems="center" height={16}>
        <div
          aria-valuemax={duration}
          aria-valuemin="0"
          aria-valuenow={currentTime}
          className={styles.playhead}
          onClick={this.stopClick}
          onKeyPress={this.stopClick}
          onMouseDown={this.handleMouseDown}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          ref={this.setPlayheadRef}
          role="progressbar"
          tabIndex="-1"
        >
          <Box left right position="absolute" color="lightGray" rounding={2} height={4}>
            <Box color="white" rounding={2} height="100%" width={width} />
          </Box>
          <Box
            position="absolute"
            rounding={2}
            height={4}
            dangerouslySetInlineStyle={{ __style: { left: width } }}
          >
            <Box
              rounding="circle"
              width={16}
              height={16}
              color="white"
              marginStart={-2}
              dangerouslySetInlineStyle={{ __style: { marginTop: -6 } }}
            />
          </Box>
        </div>
      </Box>
    );
  }
}
