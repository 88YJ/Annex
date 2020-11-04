import React from 'react';
import { Link } from 'react-router-dom';
import { ChannelList } from './ChannelList';

export const SideBar = (props) => {
  const { type } = props;

  return (
    <>
      <ChannelList />
    </>
  );
};
