package com.github.malahor.ww.location;

import static org.junit.jupiter.api.Assertions.*;

import com.github.malahor.ww.location.geocoding.GeocodingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GeocodingServiceTest {

  private GeocodingService service;

  @BeforeEach
  public void setup() {
    var apiKey = System.getenv("GEOCODING_API_KEY");
    service = new GeocodingService(apiKey);
  }

  @Test
  void geocode() {
    var result = service.geocode("here:cm:namedplace:20627927");
    assertNotNull(result.getPosition().getLatitude());
    assertNotNull(result.getPosition().getLongitude());
  }
}
