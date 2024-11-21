package com.github.malahor.ww.location;

import com.github.malahor.ww.location.autocomplete.AutoCompleteResult;
import com.github.malahor.ww.location.autocomplete.AutoCompleteService;
import com.github.malahor.ww.location.geocoding.GeocodingResult;
import com.github.malahor.ww.location.geocoding.GeocodingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final AutoCompleteService autoCompleteService;
  private final GeocodingService geocodingService;

  public AutoCompleteResult autoComplete(String query) {
    return autoCompleteService.readSuggestions(query);
  }

  public GeocodingResult geocode(String id) {
    return geocodingService.geocode(id);
  }
}
