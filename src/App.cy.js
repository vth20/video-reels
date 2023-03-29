import React from 'react';
// import { mount } from 'enzyme';
import VideoComponent from './components/Video';

describe('Test component Video', () => {

  it('should render a video player', () => {
    cy.mount(<VideoComponent />);
    cy.get('video')
      .should('be.visible')
    cy.screenshot('video_mounted', { capture: 'fullPage' })
  });

  it('should start playing when play button is clicked', () => {
    cy.mount(<VideoComponent />);
    const video = cy.get('video');
    video.click();
    video.should('have.prop', 'paused', false)
    cy.wait(3000)
    cy.screenshot('video_play', { capture: 'fullPage' })
  });

  it('should pause when pause button is clicked', () => {
    cy.mount(<VideoComponent />);
    const video = cy.get('video');
    video.click();
    cy.wait(3000)
    video.click();
    video.should('have.prop', 'paused', true)
    cy.screenshot('video_pause', { capture: 'fullPage' })
  });

  it('check heart emoji display', () => {
    cy.mount(<VideoComponent />);
    const video = cy.get('video');
    video.dblclick();
    cy.get('.hearts')
      .should('be.visible')
    // const videoElement = wrapper.find('video').getDOMNode();
    cy.screenshot('heart_display', { capture: 'fullPage' })
  });
});
