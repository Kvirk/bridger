import React, { Component } from 'react';

class MyEvents extends Component {

    render () {
        console.log('Rendering <MyEvent />');
        return (
            <section>
        <div id="carouselExampleControls" class="carousel slide col-xs-12" data-ride="carousel">
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
              <article class="event">
                <h2> Event 1</h2>
                <div class="content-section-a">
                    <div class="container">
                         <div class="row">
                            <div class="col-sm-6 pull-right wow fadeInRightBig">
                                <img class="img-responsive " src="http://www.clipartkid.com/images/466/simple-bridge-clipart-Qqzma8-clipart.png" alt="" />
                            </div>

                            <div class="col-sm-6 wow fadeInLeftBig"  data-animation-delay="200">
                                <h3 class="section-heading">Font Awesome & Glyphicon</h3>
                                <p class="lead">A special thanks to Death to the Stock Photo for
                                providing the photographs that you see in this template.
                                </p>

                                <ul class="descp lead2">
                                    <li><i class="glyphicon glyphicon-signal"></i> Reliable and Secure Platform</li>
                                    <li><i class="glyphicon glyphicon-refresh"></i> Everything is perfectly orgainized for future</li>
                                    <li><i class="glyphicon glyphicon-headphones"></i> Attach large file easily</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
              </article>
            </div>
            <div class="carousel-item">
              <article class="event">
                <h2> Event 2</h2>
                <div class="content-section-a">
                    <div class="container">
                         <div class="row">
                            <div class="col-sm-6 pull-right wow fadeInRightBig">
                                <img class="img-responsive " src="http://www.clipartkid.com/images/466/simple-bridge-clipart-Qqzma8-clipart.png" alt="" />
                            </div>
                            <div class="col-sm-6 wow fadeInLeftBig"  data-animation-delay="200">
                                <h3 class="section-heading">Font Awesome & Glyphicon</h3>
                                <p class="lead">A special thanks to Death to the Stock Photo for
                                providing the photographs that you see in this template.
                                </p>

                                <ul class="descp lead2">
                                    <li><i class="glyphicon glyphicon-signal"></i> Reliable and Secure Platform</li>
                                    <li><i class="glyphicon glyphicon-refresh"></i> Everything is perfectly orgainized for future</li>
                                    <li><i class="glyphicon glyphicon-headphones"></i> Attach large file easily</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
              </article>
            </div>
          </div>

          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </section>

        )
    }
}

export default MyEvents;