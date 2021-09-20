# Cloud-Optimized GeoTIFF Viewer

September images around Buenos Aires

```bash
aws s3 ls s3://sentinel-cogs/sentinel-s2-l2a-cogs/21/H/UB/2021/9/ --no-sign-request
```

Some visualizations:
 * True Color Composite: B04, B03, B02
 * False Color (Veg): B08, B04, B03
 * NDVI: (B08 - B04) / (B08 + B04)
 * NDWI: (B03 - B08) / (B03 + B08)
