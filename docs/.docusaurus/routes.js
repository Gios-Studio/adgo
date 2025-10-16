import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ar/search',
    component: ComponentCreator('/ar/search', '7bc'),
    exact: true
  },
  {
    path: '/ar/docs',
    component: ComponentCreator('/ar/docs', 'bef'),
    routes: [
      {
        path: '/ar/docs/',
        component: ComponentCreator('/ar/docs/', 'dc4'),
        routes: [
          {
            path: '/ar/docs/',
            component: ComponentCreator('/ar/docs/', 'fe1'),
            routes: [
              {
                path: '/ar/docs/',
                component: ComponentCreator('/ar/docs/', '781'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ar/docs/getting-started/quick-start',
                component: ComponentCreator('/ar/docs/getting-started/quick-start', 'ccd'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/ar/',
    component: ComponentCreator('/ar/', 'cb7'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
