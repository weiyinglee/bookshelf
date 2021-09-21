import React, { useState } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';

const Library = () => <Segment>library</Segment>;

const Finished = () => <Segment>finished</Segment>;

const Bookshelf = () => {
  const [activeItem, setActiveItem] = useState('library');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const renderSection = () => {
    if (activeItem === 'library') {
      return <Library />;
    }
    return <Finished />;
  };

  return (
    <Grid centered container>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item
            name='library'
            active={activeItem === 'library'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='finished'
            active={activeItem === 'finished'}
            onClick={handleItemClick}
          />
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
        {renderSection(activeItem)}
      </Grid.Column>
    </Grid>
  )
};

export default Bookshelf;
