import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import tableReadmeText from './README';
import TableExampleSimple from './ExampleSimple';
import tableExampleSimpleCode from '!raw!./ExampleSimple';

const TablePage = () => (
  <div>
    <MarkdownElement text={tableReadmeText} />
    <CodeExample code={tableExampleSimpleCode}>
      <TableExampleSimple />
    </CodeExample>
  </div>
);

export default TablePage;
