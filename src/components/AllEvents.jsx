import React, { Component } from 'react';

class AllEvents extends Component {

    render () {
        console.log('Rendering <MyEvent />');
        return (
            <section>
        <div id="carouselExampleControls" className="carousel slide col-xs-12" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <article className="event">
                <h2> Event 1</h2>
                <div className="content-section-a">
                     <div className="row">
                        <div className="col-sm-6 pull-right wow fadeInRightBig">
                            <img className="img-responsive " src="http://www.clipartkid.com/images/466/simple-bridge-clipart-Qqzma8-clipart.png" alt="" />
                        </div>

                        <div className="col-sm-6 wow fadeInLeftBig"  data-animation-delay="200">
                            <h3 className="section-heading">Font Awesome & Glyphicon</h3>
                            <p className="lead">A special thanks to Death to the Stock Photo for
                            providing the photographs that you see in this template.
                            </p>

                            <ul className="descp lead2">
                                <li><i className="glyphicon glyphicon-signal"></i> Reliable and Secure Platform</li>
                                <li><i className="glyphicon glyphicon-refresh"></i> Everything is perfectly orgainized for future</li>
                                <li><i className="glyphicon glyphicon-headphones"></i> Attach large file easily</li>
                            </ul>
                        </div>
                    </div>
                </div>
              </article>
            </div>
            <div className="carousel-item">
              <article className="event">
                <h2> Event 2</h2>
                <div className="content-section-a">
                     <div className="row">
                        <div className="col-sm-6 pull-right wow fadeInRightBig">
                            <img className="img-responsive " src="http://www.clipartkid.com/images/466/simple-bridge-clipart-Qqzma8-clipart.png" alt="" />
                        </div>
                        <div className="col-sm-6 wow fadeInLeftBig"  data-animation-delay="200">
                            <h3 className="section-heading">Font Awesome & Glyphicon</h3>
                            <p className="lead">A special thanks to Death to the Stock Photo for
                            providing the photographs that you see in this template.
                            </p>

                            <ul className="descp lead2">
                                <li><i className="glyphicon glyphicon-signal"></i> Reliable and Secure Platform</li>
                                <li><i className="glyphicon glyphicon-refresh"></i> Everything is perfectly orgainized for future</li>
                                <li><i className="glyphicon glyphicon-headphones"></i> Attach large file easily</li>
                            </ul>
                        </div>
                    </div>
                </div>
              </article>
            </div>
          </div>

          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>

        )
    }
}

export default AllEvents;