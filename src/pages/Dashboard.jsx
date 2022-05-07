const Dashboard = () => {
    return (<>
        <div>whos_in_the_lab</div>
        <section className="container">
            <header className="row">
                <div className="col-sm-12">
                    <h2>
                        whos_in_the_lab
                        <div className="pull-right">
                            <span className="small">
                                people_at_about_html
                                <time dateTime="2022-05-07T19:02:46+03:00">19:02</time>
                            </span>
                        </div>
                    </h2>
                </div>
            </header>
            <div className="present_users">
                {/* if */}
                <div className="row">
                    present_user
                </div>
                {/* else */}
                <div className="row">
                    <div className="no_users">
                        frown-o
                        <h5>everybodys_gone
                        </h5>
                    </div>
                </div>
                {/* endif */}</div>
            <h3>sensor_readings
            </h3>
            <div className="row">
                {/* foreach */}
                <div className="col-sm-4">
                    <div data-label="label" data-label-type="Temperature" data-mqtt-topic="topic">Loading...
                    </div>
                </div>
                {/* endforeach */}</div>
        </section>
    </>);
};

export default Dashboard;
