import React from 'react'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from '@codemirror/lang-javascript';
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { cpp } from '@codemirror/lang-cpp';
import Split from 'react-split';
import Preference from './PreferenceBar/Preference';

type PlaygroundProps = {

}

const Playground:React.FC<PlaygroundProps> = ({}) => {

    const language = 'javascript';

    return (
      <div className=" bg-black text-white">
        <Preference />
        <Split
          className="h-[calc(100vh-94px)]"
          direction="vertical"
          sizes={[60, 40]}
          minSize={60}
        >
          <div className="w-full overflow-auto">
            <CodeMirror
              value="const a = 1;"
              theme={oneDarkTheme}
              extensions={[javascript()]}
              style={{ fontSize: 16 }}
            />
            {/* <CodeMirror value='double d = 5.2;' theme={oneDarkTheme} extensions={[cpp()]} style={{fontSize:18}}/> */}
          </div>
          <div className='w-full px-5 overflow-auto'>
            <div className="flex h-10 items-center space-x-6">
                <div className="relative flex h-full justify-center cursor-pointer">
                    <div className="text-sm font-medium leading-5 text-white">Testcases
                    <hr />
                    </div>
                </div>
            </div>
          </div>
        </Split>
      </div>
    );
}

export default Playground