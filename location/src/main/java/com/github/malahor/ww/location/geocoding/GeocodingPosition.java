package com.github.malahor.ww.location.geocoding;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class GeocodingPosition {

  @JsonAlias("lat")
  private String latitude;

  @JsonAlias("lng")
  private String longitude;
}
