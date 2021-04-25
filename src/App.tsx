import logo from "./logo.svg"
import "./App.css"
import { Codec, string, GetType } from "purify-ts/Codec"
import api from "./api"
import { useQuery } from "react-query"

const Consumer = Codec.interface({
  id: string,
  name: string,
  annotation: string,
  estateId: string,
  cityId: string,
})

type Consumer = GetType<typeof Consumer>

const fetchConsumerList = async (): Promise<Consumer[]> => {
  const { data } = await api.get<Consumer[]>("/consumer")
  return data
}

function App(): JSX.Element {
  const { data, error } = useQuery("consumer-list", fetchConsumerList)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Batata frita!
        </a>
        {data && (
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        {error && (
          <div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
