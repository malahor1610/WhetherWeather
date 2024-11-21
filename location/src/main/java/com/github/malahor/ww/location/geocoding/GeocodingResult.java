package com.github.malahor.ww.location.geocoding;

import lombok.Data;

@Data
public class GeocodingResult {

  private String id;
  private String title;
  private GeocodingPosition position;
}
