import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';

import About from './About';
import Ideas from './Ideas';

const BottomNav = ({ updateList, setUpdateList }) => {

    const IdeasRoute = () => <Ideas updateList={updateList} setUpdateList={setUpdateList} />;

    const AboutRoute = () => <About />;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'ideas', title: 'Ideas', icon: 'lightbulb-on-outline', color: '#26456E', },
        { key: 'about', title: 'About', icon: 'information-variant', color: '#26456E', },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        ideas: IdeasRoute,
        about: AboutRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={true}
        />
    );
};

export default BottomNav;