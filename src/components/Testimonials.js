import React, {Component} from 'react';

/** Fills Testimonials section with data from resumeData */
export default class Testimonials extends Component {
  /** Render Testimonials section
   * @param {Object} resumeData - Data from resumeData.js
   * @return {JSX} Testimonials section
  */
  render() {
    const resumeData = this.props.resumeData;
    return (
      <section id="testimonials">
        <div className="text-container">
          <div className="row">
            <div className="two columns header-col">
              <i className="fas fa-quote-left fa-5x"/>
            </div>
            <div className="ten columns flex-container">
              <div className="flexslider">
                <ul className="slides">
                  {
                    resumeData.testimonials &&
                    resumeData.testimonials.map((item)=>{
                      return (
                        <li key={item.name}>
                          <blockquote>
                            <p>
                              {item.description}
                            </p>
                            <cite>{item.name}</cite>
                          </blockquote>
                        </li>
                      );
                    })
                  }
                </ul>
              </div> {/* div.flexslider ends */}
            </div> {/* div.flex-container ends */}
          </div> {/* row ends */}
        </div>  {/* text-container ends */}
      </section>
    );
  }
}
