import {Button, ButtonGroup, Card, Col, Image} from "react-bootstrap";
import type {FaunaPresentUser} from "../../fauna-types";

const PresentUserCard = ({user}: { user: FaunaPresentUser }) =>
    <Col key={user.picture}>
        <Card className="h-100">
            <Card.Header>
                {user.picture &&
                    <Image fluid src={user.picture.replace('s=128', 's=242')} alt="avatar" className="w-100"/>}
            </Card.Header>
            <Card.Body className="text-center">
                <h5 className="mb-4">
                    {user.username}
                </h5>
                <ButtonGroup>
                    {user.twitter &&
                        <Button href={'https://twitter.com/' + user.twitter} target="_blank">
                            <i className="fab fa-twitter fa-2x"></i>
                        </Button>}
                    {user.github &&
                        <Button variant="default" href={'https://github.com/' + user.github} target="_blank">
                            <i className="fab fa-github fa-2x"></i>
                        </Button>}
                    {user.url &&
                        <Button variant="info" href={user.url} target="_blank">
                            <i className="fa-solid fa-link fa-2x"></i>
                        </Button>}
                </ButtonGroup>
            </Card.Body>
        </Card>
    </Col>;


export default PresentUserCard;