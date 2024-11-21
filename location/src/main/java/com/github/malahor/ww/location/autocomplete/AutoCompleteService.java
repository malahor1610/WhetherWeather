package com.github.malahor.ww.location.autocomplete;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class AutoCompleteService {

  private static final String COORDINATES = "50.6634,17.930138";
  private final RestClient client =
      RestClient.create("https://autocomplete.search.hereapi.com/v1/autocomplete");
  private final String apiKey;

  public AutoCompleteService(@Value("${geocoding.api.key}") String apiKey) {
    this.apiKey = apiKey;
  }

  public AutoCompleteResult readSuggestions(String query) {
    return client
        .get()
        .uri(
            uriBuilder ->
                uriBuilder
                    .queryParam("at", COORDINATES)
                    .queryParam("lang", "pl")
                    .queryParam("types", "city")
                    .queryParam("q", query)
                    .queryParam("apiKey", apiKey)
                    .build())
        .retrieve()
        .toEntity(AutoCompleteResult.class)
        .getBody();
  }
}
