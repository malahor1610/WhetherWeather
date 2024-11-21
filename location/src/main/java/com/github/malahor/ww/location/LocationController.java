package com.github.malahor.ww.location;

import com.github.malahor.ww.location.autocomplete.AutoCompleteResult;
import com.github.malahor.ww.location.geocoding.GeocodingResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {

  private final LocationService service;

  @GetMapping
  public ResponseEntity<AutoCompleteResult> autoSuggest(@RequestParam("query") String query) {
    return ResponseEntity.ok(service.autoComplete(query));
  }

  @PostMapping("/{id}")
  public ResponseEntity<GeocodingResult> geocoding(@PathVariable("id") String id) {
    return ResponseEntity.ok(service.geocode(id));
  }
}
