package com.github.malahor.ww.location.geocoding;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GeocodingService {

  private final RestClient client =
      RestClient.create("https://lookup.search.hereapi.com/v1/lookup");
  private final String apiKey;

  public GeocodingService(@Value("${geocoding.api.key}") String apiKey) {
    this.apiKey = apiKey;
  }

  public GeocodingResult geocode(String id) {
    return client
        .get()
        .uri(uriBuilder -> uriBuilder.queryParam("id", id).queryParam("apiKey", apiKey).build())
        .retrieve()
        .toEntity(GeocodingResult.class)
        .getBody();
  }
}
