package com.github.malahor.ww.location;

import static org.junit.jupiter.api.Assertions.*;

import com.github.malahor.ww.location.autocomplete.AutoCompleteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AutoCompleteServiceTest {

  private AutoCompleteService service;

  @BeforeEach
  public void setup() {
    var apiKey = System.getenv("GEOCODING_API_KEY");
    service = new AutoCompleteService(apiKey);
  }

  @Test
  void readSuggestions() {
    var result = service.readSuggestions("opo");
    assertEquals(5, result.getItems().size());
    assertNotNull(result.getItems().getFirst().getName());
  }
}
