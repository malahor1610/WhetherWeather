"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import { LoadingContext } from "./layout";
import { fetchAutoComplete, fetchGeocoding } from "./lib/data";
import useDebounce from "./lib/debounce";

export default function Home() {
  const [weather, setWeather] = useState({});
  const [input, setInput] = useState("");
  const [location, setLocation] = useState({});
  const [autoComplete, setAutoComplete] = useState({});
  const { loading, setLoading } = useContext(LoadingContext);
  const debouncedInput = useDebounce(input, 1000);

  function onChangeInput(e) {
    setInput(e.target.value);
    setAutoComplete({});
  }

  const getAutoComplete = useCallback(
    async (value) => {
      setLoading(true);
      let autoCompletions = await fetchAutoComplete(value);
      setAutoComplete(autoCompletions);
      setLoading(false);
    },
    [setAutoComplete, setLoading]
  );

  useEffect(() => {
    if (debouncedInput && debouncedInput !== location.name) {
      getAutoComplete(debouncedInput);
    }
  }, [debouncedInput]);

  async function chooseLocation(e) {
    e.preventDefault();
    setLoading(true);
    setInput(location.name);
    console.log(location.id + " " + location.name);
    let result = await fetchGeocoding(location.id);
    console.log(result);
    setAutoComplete({});
    setLoading(false);
  }
  return (
    <Form onSubmit={chooseLocation}>
      <Row className="justify-content-center mt-3">
        <Col md="6">
          <Input
            type="search"
            className="my-1"
            value={input}
            placeholder="Wprowadź lokalizację..."
            onChange={onChangeInput}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <ul
          hidden={!autoComplete.items || !input}
          className="dropdown-menu show w-auto p-1"
        >
          {autoComplete.items?.map((item) => (
            <li key={item.name}>
              <Button
                className="w-100 text-start"
                type="submit"
                color="light"
                onClick={() => setLocation(item)}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </Row>
    </Form>
  );
}
