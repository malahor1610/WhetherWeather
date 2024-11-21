package com.github.malahor.ww.location.autocomplete;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class AutoCompleteItem {

  private String id;

  @JsonAlias("address")
  private String name;

  public void setName(JsonNode address) {
    this.name = address.get("label").asText();
  }
}
