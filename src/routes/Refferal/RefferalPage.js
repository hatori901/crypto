
import {useMoralis} from 'react-moralis'
import { Input,Tooltip,Button } from "antd";
import { CopyOutlined } from '@ant-design/icons';

export default function Example() {
    const { isAuthenticated,user } = useMoralis();

    return (
    <div className="relative overflow-hidden">
      <div className="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect width={364} height={384} fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 sm:mt-24">
          <div className="w-full">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-800 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Reffer Friends</span>{' '}
                    <span className="text-blue-900 md:block">Earn Crypto Together</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                    amet fugiat veniam occaecat fugiat aliqua ad ad non deserunt sunt.
                  </p>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="bg-gray-700 shadow-md sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <div className="px-4 py-8 sm:px-10">
                    <div className="mt-6">
                        {isAuthenticated && (
                            <>
                            <div style={{marginBlock: "10px"}}>
                                <p className='text-xl font-bold text-white'>Refferal ID</p>
                                <Input.Group compact>
                                    <Input
                                        style={{ width: 'calc(100% - 50px)' }}
                                        defaultValue={user.get("refferal")}
                                        readOnly={true}
                                    />
                                    <Tooltip title="copy refferal ID">
                                        <Button icon={<CopyOutlined />} />
                                    </Tooltip>
                                </Input.Group>
                            </div>
                            <div style={{marginBlock: "10px"}}>
                                <p className='text-xl font-bold text-white'>Refferal Link</p>
                                <Input.Group compact>
                                    <Input
                                        style={{ width: 'calc(100% - 50px)' }}
                                        defaultValue={`https://app.kommunitas.net/refferal/${user.get("refferal")}`}
                                        readOnly={true}
                                    />
                                    <Tooltip title="copy refferal Link">
                                        <Button icon={<CopyOutlined />} />
                                    </Tooltip>
                                </Input.Group>
                            </div>
                            </>
                        )}
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
