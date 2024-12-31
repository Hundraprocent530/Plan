import React, { useState } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Paper,
} from '@mui/material';

const TrailerSpecification = () => {
  const [chassis, setChassis] = useState({
    axle: 'Double-axle with overrun brake', // Default axle
    hitch: 'AL-KO (Length: 128 cm)', // Hitch value
  });
  const [exteriorLength, setExteriorLength] = useState(4.0); // Default exterior length in meters
  const [loadingLength, setLoadingLength] = useState(3.92); // Default loading area length
  const [totalLength, setTotalLength] = useState(5.28); // Default total length
  const [serviceWeight, setServiceWeight] = useState(1100); // Default service weight in kg
  const [totalWeight, setTotalWeight] = useState(1800); // Default total weight in kg
  const [tires, setTires] = useState('All-season tires, 4 pcs, 13″, 165R13 C, 5×112'); // Default tire
  const [wheelcover, setWheelcover] = useState('Wheelcover Large'); // Default wheelcover
  const [wheelcoverDimensions, setWheelcoverDimensions] = useState({
    width: 145, // Default width for 'Wheelcover Large'
    height: 33, // Default height
    depth: 33,  // Default depth
    distanceToWall: { left: 135, right: 112 }, // Default distance
  });
  const [totalHeight, setTotalHeight] = useState(3.1);
  const [boxMaterial, setBoxMaterial] = useState('Aluminum'); // Default material
  const [exteriorWidth, setExteriorWidth] = useState(2.3); // Default Exterior Width
  const [loadingWidth, setLoadingWidth] = useState(2.22); // Default Loading Width
  const [additionalThickness, setAdditionalThickness] = useState(4); // Default wall thickness: 4cm
  const [doorWidth, setDoorWidth] = useState(90);
  const [doorHeight, setDoorHeight] = useState(190);
  const [leftToRight, setLeftToRight] = useState(70);
  const [rightToLeft, setRightToLeft] = useState(70);
  const [position, setPosition] = React.useState(66);
  const [unit1LeftToRight, setUnit1LeftToRight] = useState(40);
  const [unit1WallToEdge, setUnit1WallToEdge] = useState(0);
  const [unit2RightToLeft, setUnit2RightToLeft] = useState(40);
  const [unit2WallToEdge, setUnit2WallToEdge] = useState(0);

  // Sales Hatch State
  const [salesHatch, setSalesHatch] = useState({
    width: 200,
    height: 120,
    leftToRight: 95,
    rightToLeft: 105,
    topToRoof: 36,
    bottomToFloor: 66,
  });
  
  const updateSalesHatch = (key, value) => {
    setSalesHatch((prev) => ({ ...prev, [key]: value }));
  };
  
  const colorOptions = ['Black', 'White', 'Green', 'Blue', 'Red'];

  const ColorSelector = ({ selectedColor, onSelect }) => (
    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
      {colorOptions.map((color) => (
        <Box
          key={color}
          onClick={() => onSelect(color)}
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: color.toLowerCase(),
            border: selectedColor === color ? '2px solid #000' : '1px solid #ccc',
            cursor: 'pointer',
          }}
          title={color}
        />
      ))}
    </Box>
  );  

  const axleOptions = [
    { 
      value: 'Single-axle with overrun brake', 
      label: 'Single-axle with overrun brake', 
      disabled: exteriorLength > 4.0 // Disable Single Axle for lengths > 4.0m
    },
    { 
      value: 'Double-axle with overrun brake', 
      label: 'Double-axle with overrun brake', 
      disabled: exteriorLength <= 3.9 // Disable Double Axle for lengths <= 3.9m
    },
  ];  
  
  const tireOptions = {
    'Single-axle with overrun brake': [
      { value: 'All-season tires, 2 pcs, 13″, 165R13 C, 5×112', label: 'All-season tires, 2 pcs, 13″, 165R13 C, 5×112', wheelcover: 'Wheelcover Small' },
      { value: 'All-season tires, 2 pcs, 10″, 195/55/R 10 C 5, 98/96', label: 'All-season tires, 2 pcs, 10″, 195/55/R 10 C 5, 98/96', wheelcover: 'No wheelcover - Flat floor inside' },
    ],
    'Double-axle with overrun brake': [
      { value: 'All-season tires, 4 pcs, 13″, 165R13 C, 5×112', label: 'All-season tires, 4 pcs, 13″, 165R13 C, 5×112', wheelcover: 'Wheelcover Large' },
      { value: 'All-season tires, 4 pcs, 10″, 195/55/R 10 C 5, 98/96', label: 'All-season tires, 4 pcs, 10″, 195/55/R 10 C 5, 98/96', wheelcover: 'No wheelcover - Flat floor inside' },
    ],
  };

  const calculateServiceWeight = (length, axle) => {
    if (axle === 'Double-axle with overrun brake') {
      // Double-Axle Logic
      if (length >= 4.0) {
        return 1100 + Math.round((length - 4.0) * 10) * 10; // +10kg per 0.1m increase
      } else {
        return 1100 - Math.round((4.0 - length) * 10) * 10; // -10kg per 0.1m decrease
      }
    } else if (axle === 'Single-axle with overrun brake') {
      // Single-Axle Logic
      if (length === 4.0) return 950;
      if (length === 3.9) return 940;
      if (length === 3.0) return 850;
      if (length < 4.0) {
        return 950 - Math.round((4.0 - length) * 10) * 10; // -10kg per 0.1m decrease
      } else {
        return 950 + Math.round((length - 4.0) * 20); // +20kg per 0.1m increase
      }
    }
  };  

const handleAxleChange = (event) => {
  const selectedAxle = event.target.value;

  setChassis((prev) => ({
    ...prev,
    axle: selectedAxle,
  }));

  // Adjust service weight
  const adjustedServiceWeight = calculateServiceWeight(exteriorLength, selectedAxle);
  setServiceWeight(adjustedServiceWeight);

  // Update tires and wheelcover based on axle
  if (selectedAxle === 'Single-axle with overrun brake') {
    setTires('All-season tires, 2 pcs, 13″, 165R13 C, 5×112');
    setWheelcover('Wheelcover Small');
    setWheelcoverDimensions({
      width: 90,
      height: 33,
      depth: 33,
      distanceToWall: { left: 156, right: 146 },
    });
    if (exteriorLength === 4.0) {
      setTotalWeight(1300); // Cap total weight at 1300 kg for single axle at 4.0m
    }
  } else if (selectedAxle === 'Double-axle with overrun brake') {
    setTires('All-season tires, 4 pcs, 13″, 165R13 C, 5×112');
    setWheelcover('Wheelcover Large');
    setWheelcoverDimensions({
      width: 145,
      height: 33,
      depth: 33,
      distanceToWall: { left: 135, right: 112 },
    });
    setTotalWeight(1800); // Reset to default
  }
};

const handleTireChange = (event) => {
  const selectedTire = event.target.value;
  setTires(selectedTire);

  // Update wheelcover and dimensions
  const selectedOption = (tireOptions[chassis.axle] || []).find(
    (option) => option.value === selectedTire
  );

  if (selectedOption) {
    setWheelcover(selectedOption.wheelcover);
    if (selectedOption.wheelcover === 'Wheelcover Small') {
      setWheelcoverDimensions({
        width: 90,
        height: 33,
        depth: 33,
        distanceToWall: { left: 156, right: 146 },
      });
    } else if (selectedOption.wheelcover === 'Wheelcover Large') {
      setWheelcoverDimensions({
        width: 145,
        height: 33,
        depth: 33,
        distanceToWall: { left: 135, right: 112 },
      });
    } else if (selectedOption.wheelcover === 'No wheelcover - Flat floor inside') {
      setWheelcoverDimensions({
        width: 145,
        height: 33,
        depth: 33,
        distanceToWall: { left: 392, right: 392 },
      });
    }
  }
  
    // Recalculate height
    const newHeight = calculateTotalHeight(chassis.axle, selectedTire);
    setTotalHeight(newHeight);
  };

  const calculateTotalHeight = (axle, tire) => {
    if (tire.includes('10″')) {
      return 3.23; // Height for tires 10"
    } else if (tire.includes('13″')) {
      return 3.1; // Height for tires 13"
    }
    return 3.1; // Default height
  };
  
  const handleLengthChange = (event, newValue) => {
    setExteriorLength(newValue);
    setLoadingLength(parseFloat((newValue - 0.08).toFixed(2))); // Adjust loading length
    setTotalLength(parseFloat((newValue + 1.28).toFixed(2))); // Adjust total length
  
    // Automatically enforce Double Axle for lengths > 4.0m
    if (newValue > 4.0) {
      if (chassis.axle !== 'Double-axle with overrun brake') {
        setChassis((prev) => ({
          ...prev,
          axle: 'Double-axle with overrun brake', // Enforce Double Axle
        }));
      }
  
      // Adjust service weight for Double Axle
      const additionalWeight = Math.round((newValue - 4.0) * 10) * 10; // +10kg per 0.1m increase
      setServiceWeight(1100 + additionalWeight);
  
      // Set total weight for Double Axle
      setTotalWeight(1800);

    // Ensure tire choice consistency for Double Axle
    if (tires.includes('10″')) {
      setTires('All-season tires, 4 pcs, 10″, 195/55/R 10 C 5, 98/96');
      setWheelcover('No wheelcover - Flat floor inside');
      setWheelcoverDimensions({
        width: 145,
        height: 33,
        depth: 33,
        distanceToWall: {
          left: 392 + Math.round((newValue - 4.0) * 50), // Increment for length > 4.0
          right: 392 + Math.round((newValue - 4.0) * 50),
        },
      });
    } else if (tires.includes('13″')) {
      setTires('All-season tires, 4 pcs, 13″, 165R13 C, 5×112');
      setWheelcover('Wheelcover Large');
      setWheelcoverDimensions({
        width: 145,
        height: 33,
        depth: 33,
        distanceToWall: {
          left: 135 + Math.round((newValue - 4.0) * 50),
          right: 112 + Math.round((newValue - 4.0) * 50),
        },
      });
    }
  } else {
    // Handle Single Axle for lengths <= 4.0m
    if (chassis.axle !== 'Single-axle with overrun brake') {
      setChassis((prev) => ({
        ...prev,
        axle: 'Single-axle with overrun brake', // Switch back to Single Axle
      }));
    }
  
    // Calculate service weight for Single Axle
    const decrement = Math.round((4.0 - newValue) * 10) * 10; // -10kg per 0.1m decrease
    setServiceWeight(950 - decrement);

    setTotalWeight(1300); // Fixed for Single Axle

    // Ensure tire choice consistency for Single Axle
    if (tires.includes('10″')) {
      setTires('All-season tires, 2 pcs, 10″, 195/55/R 10 C 5, 98/96');
      setWheelcover('No wheelcover - Flat floor inside');
      setWheelcoverDimensions({
        width: 145,
        height: 33,
        depth: 33,
        distanceToWall: {
          left: 392 - Math.round((4.0 - newValue) * 50), // Decrement for length < 4.0
          right: 392 - Math.round((4.0 - newValue) * 50),
        },
      });
    } else if (tires.includes('13″')) {
      setTires('All-season tires, 2 pcs, 13″, 165R13 C, 5×112');
      setWheelcover('Wheelcover Small');
      setWheelcoverDimensions({
        width: 90,
        height: 33,
        depth: 33,
        distanceToWall: {
          left: 156 - Math.round((4.0 - newValue) * 50),
          right: 146 - Math.round((4.0 - newValue) * 50),
        },
      });
    }
  }
};
  
  const handleWeightIncrease = () => {
    setTotalWeight((prevWeight) => {
      if (chassis.axle === 'Single-axle with overrun brake') {
        return prevWeight + 50 <= 1300 ? prevWeight + 50 : prevWeight; // Max 1300 for single axle
      } else if (chassis.axle === 'Double-axle with overrun brake') {
        return prevWeight + 50 <= 3500 ? prevWeight + 50 : prevWeight; // Max 3500 for double axle
      }
      return prevWeight;
    });
  };
  
  const handleWeightDecrease = () => {
    setTotalWeight((prevWeight) => {
      if (chassis.axle === 'Single-axle with overrun brake') {
        return prevWeight - 50 >= 950 ? prevWeight - 50 : prevWeight; // Min 950 for single axle
      } else if (chassis.axle === 'Double-axle with overrun brake') {
        return prevWeight - 50 >= 1200 ? prevWeight - 50 : prevWeight; // Min 1200 for double axle
      }
      return prevWeight;
    });
  };


  // Handle changes to exteriorWidth
  const handleExteriorWidthChange = (newValue) => {
    setExteriorWidth(newValue);
    calculateLoadingWidth(newValue, additionalThickness);
  };

  const handleThicknessChange = (thickness) => {
    setAdditionalThickness(thickness);
    calculateLoadingWidth(exteriorWidth, thickness);
  };

  const calculateLoadingWidth = (width, thickness) => {
    const loadingOffset = thickness === 4 ? 0.08 : thickness === 8 ? 0.16 : 0.0; // Adjust based on thickness
    setLoadingWidth(parseFloat((width - loadingOffset).toFixed(2)));
  };
  
  return (
        <Box>
          <Typography variant="h5" gutterBottom>
            Step 1: Trailer Specification
          </Typography>

      {/* Chassis Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Chassis</Typography>
        <Typography>Hitch: {chassis.hitch}</Typography>
        <Typography sx={{ mt: 2 }}>Axle:</Typography>
        <RadioGroup value={chassis.axle} onChange={handleAxleChange}>
          {axleOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              disabled={option.disabled}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Tires and Covers Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Tires & Covers</Typography>
        <Typography sx={{ mt: 2 }}>Tires:</Typography>
        <RadioGroup value={tires} onChange={handleTireChange}>
          {(tireOptions[chassis.axle] || []).map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
      </RadioGroup>
      <Typography variant="h6" sx={{ mt: 2 }}>Wheelcover:</Typography>
{wheelcover ? (
  <Typography>
    <strong>{wheelcover === 'No wheelcover - Flat floor inside' ? 'No wheelcover' : wheelcover}</strong>
    <br />
    {wheelcover === 'No wheelcover - Flat floor inside' && (
      <>
        Flat floor inside
        <br />
      </>
    )}
    {wheelcover !== 'No wheelcover - Flat floor inside' && (
      <>
        Dimensions: {wheelcoverDimensions.width} x {wheelcoverDimensions.height} x {wheelcoverDimensions.depth} cm
        <br />
      </>
    )}
    Distance to wall: Left: {wheelcoverDimensions.distanceToWall.left} cm, Right: {wheelcoverDimensions.distanceToWall.right} cm
  </Typography>
) : (
  <Typography>
    <em>No wheelcover selected</em>
  </Typography>
)}
    </Box>

      {/* Dimensions Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Dimensions</Typography>
        <Typography>Total Length: {totalLength.toFixed(2)} m</Typography>
        <Typography>Total Height: {totalHeight.toFixed(2)} m</Typography>
       {/* Exterior Length Slider */}
       <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Exterior Length</Typography>
        <Typography>Current Length: {exteriorLength.toFixed(2)} m</Typography>
        <Slider
          value={exteriorLength}
          onChange={handleLengthChange}
          step={0.1}
          min={3}
          max={12}
          valueLabelDisplay="auto"
        />
        </Box>

      {/* Exterior Width Options */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Exterior Width</Typography>
        <RadioGroup
          value={exteriorWidth}
          onChange={(e) => handleExteriorWidthChange(parseFloat(e.target.value))}
        >
          <FormControlLabel value={2.3} control={<Radio />} label="2.3 m" />
          <FormControlLabel value={2.5} control={<Radio />} label="2.5 m" />
        </RadioGroup>
      </Box>
        <Typography>Exterior Height: 2.72 m (Lowest Roof Point: 2.28 m)</Typography>
        <Typography>Loading Length: {loadingLength.toFixed(2)} m</Typography>
        <Typography>Loading Width: {loadingWidth.toFixed(2)} m</Typography>
        <Typography>Loading Height: 2.2 m (Lowest Roof Point: 2.18 m)</Typography>
      </Box>

{/* Weight Section */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Weight</Typography>
  <Typography>Service Weight: {serviceWeight} kg</Typography>
  <Typography>Total Weight: {totalWeight} kg</Typography>
  <Typography>Load Capacity: {Math.max(totalWeight - serviceWeight, 0)} kg</Typography>
  <Typography>Additional Weight: {Math.max(400 - (serviceWeight - 1100), 0)} kg</Typography>
  
  {/* Display Weight Limits Dynamically */}
  <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
    Weight Limits: 
    {chassis.axle === 'Single-axle with overrun brake'
      ? ' 950 kg - 1300 kg'
      : ' 1200 kg - 3500 kg'}
  </Typography>
  
  {/* Buttons for Adjusting Total Weight */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
    <Button
      variant="contained"
      color="primary"
      onClick={handleWeightIncrease}
      disabled={
        (chassis.axle === 'Single-axle with overrun brake' && totalWeight >= 1300) ||
        (chassis.axle === 'Double-axle with overrun brake' && totalWeight >= 3500)
      }
    >
      Increase Weight (+50 kg)
    </Button>
    <Button
      variant="contained"
      color="secondary"
      onClick={handleWeightDecrease}
      disabled={
        (chassis.axle === 'Single-axle with overrun brake' && totalWeight <= 950) ||
        (chassis.axle === 'Double-axle with overrun brake' && totalWeight <= 1200)
      }
    >
      Decrease Weight (-50 kg)
    </Button>
  </Box>
</Box>

{/* Step 2: Box Specification */}
<Box>
  <Typography variant="h5" gutterBottom>
    Step 2: Box Specification
  </Typography>

  {/* Structure Section */}
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6">Structure</Typography>
    <Typography sx={{ mt: 1 }}>
      <strong>Frame:</strong> Anodized Aluminum
    </Typography>
    <Typography sx={{ mt: 1 }}>
      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
        <li>Upper 4 cm, Lower 6 cm</li>
      </ul>
    </Typography>
    <Typography sx={{ mt: 1 }}>
      <strong>Roof slope:</strong> 2 cm
    </Typography>
  </Box>

  {/* Insulation Section */}
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6">Insulation</Typography>
    <Typography sx={{ mt: 1 }}>
      <strong>Material:</strong> Laminated Sandwich Panels
    </Typography>
  </Box>

  {/* Floor Section */}
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6">Floor</Typography>
    <Typography sx={{ mt: 1 }}>
      <strong>Thickness:</strong> 6 cm
    </Typography>
    <Typography sx={{ mt: 1 }}>No-Slip Vinyl</Typography>
    <Typography sx={{ mt: 1 }}>
      <strong>Color Inside:</strong>
    </Typography>
    <Box sx={{ mt: 1 }}>
      <select id="floor-color" style={{ padding: '0.5rem' }}>
        <option value="Grey">Grey</option>
        <option value="Brown">Brown</option>
      </select>
    </Box>
  </Box>

{/* Wall Section */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Wall</Typography>

  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    <input
      type="radio"
      id="additional-thickness-4cm"
      name="wall-thickness"
      checked={additionalThickness === 4}
      onChange={() => handleThicknessChange(4)}
    />
    <label htmlFor="additional-thickness-4cm">
      <Typography sx={{ ml: 1 }}>Thickness: 4 cm</Typography>
    </label>
  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    <input
      type="radio"
      id="additional-thickness-8cm"
      name="wall-thickness"
      checked={additionalThickness === 8}
      onChange={() => handleThicknessChange(8)}
    />
    <label htmlFor="additional-thickness-8cm">
      <Typography sx={{ ml: 1 }}>Thickness: 8 cm</Typography>
    </label>
  </Box>

  <Typography sx={{ mt: 1 }}>
    <strong>Color Inside:</strong> White
  </Typography>
  <Typography sx={{ mt: 1 }}>
    <strong>Color Outside:</strong>
  </Typography>
  <Box sx={{ mt: 1 }}>
    <select id="wall-outside-color" style={{ padding: '0.5rem' }}>
    <option value="Black">Black</option>
      <option value="White">White</option>
    </select>
  </Box>
</Box>

{/* Roof Section */}
<Box sx={{ mb: 4 }}>
    <Typography variant="h6">Roof</Typography>
    <Typography sx={{ mt: 1 }}>
      <strong>Thickness:</strong> 4 cm
    </Typography>
    <Typography sx={{ mt: 1 }}>
      <strong>Color Inside:</strong> White
    </Typography>
    <Typography sx={{ mt: 1 }}>
      <strong>Color Outside:</strong>
    </Typography>
    <Box sx={{ mt: 1 }}>
      <select id="roof-outside-color" style={{ padding: '0.5rem' }}>
      <option value="Black">Black</option>
      <option value="White">White</option>
      </select>
    </Box>
  </Box>


{/* Door Customization */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Door
  </Typography>

    {/* Units */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Units:
    </Typography>
    <select
      id="door-units"
      defaultValue="1"
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </Box>

  {/* Material */}
  <Typography variant="body2" sx={{ mt: 1 }}>
    <strong>Material:</strong> Aluminum frame 0.2-0.4 cm (0.44 cm with trim)
  </Typography>

  {/* Thickness */}
  <Typography variant="body2" sx={{ mt: 1 }}>
    <strong>Thickness:</strong> 4 cm
  </Typography>

  {/* Lock */}
  <Typography variant="body2" sx={{ mt: 1 }}>
    <strong>Lock:</strong> 2 pcs
  </Typography>

  {/* Door 1 */}
  <Typography variant="body2" sx={{ mt: 2 }}>
    <strong>Door 1:</strong>
  </Typography>

{/* Door Width Slider */}
<Box sx={{ mb: 2 }}>
  <Typography variant="h6">Door Width</Typography>
  <Typography>Current Width: {`${(doorWidth / 100).toFixed(2)} m`}</Typography>
  <Slider
    id="door-width"
    value={doorWidth}
    min={50}
    max={220}
    step={1}
    onChange={(e, value) => setDoorWidth(value)}
    valueLabelDisplay="auto"
  />
</Box>

{/* Door Height Slider */}
<Box sx={{ mb: 2 }}>
  <Typography variant="h6">Door Height</Typography>
  <Typography>Current Height: {`${(doorHeight / 100).toFixed(2)} m`}</Typography>
  <Slider
    id="door-height"
    value={doorHeight}
    min={50}
    max={220}
    step={1}
    onChange={(e, value) => setDoorHeight(value)}
    valueLabelDisplay="auto"
  />
</Box>

      {/* From Left to Right Slider */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">From Left to Right</Typography>
        <Typography>Current: {`${leftToRight} cm`}</Typography>
        <Slider
          value={leftToRight}
          min={50}
          max={300}
          step={1}
          onChange={(e, value) => setLeftToRight(value)}
          valueLabelDisplay="auto" // Only show value when hovering or dragging
        />
      </Box>

      {/* From Right to Left Slider */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">From Right to Left</Typography>
        <Typography>Current: {`${rightToLeft} cm`}</Typography>
        <Slider
          value={rightToLeft}
          min={50}
          max={300}
          step={1}
          onChange={(e, value) => setRightToLeft(value)}
          valueLabelDisplay="auto" // Only show value when hovering or dragging
        />
      </Box>

  {/* Hang */}
<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
  <Typography variant="body2" sx={{ mr: 2 }}>
    Hang:
  </Typography>
  <select
    id="door-hang"
    defaultValue="left"
    style={{
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
      maxWidth: '200px', // Optional, to limit the dropdown width
    }}
  >
    <option value="left">Left</option>
    <option value="right">Right</option>
  </select>
</Box>



{/* Placement */}
<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
  <Typography variant="body2" sx={{ mr: 2 }}>
    Placement:
  </Typography>
  <select
    id="door-placement"
    defaultValue="e4"
    style={{
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
      maxWidth: '200px', // Optional, to limit the dropdown width
    }}
  >
    <option value="e1">Elevation 1</option>
    <option value="e2">Elevation 2</option>
    <option value="e3">Elevation 3</option>
    <option value="e4">Elevation 4</option>
  </select>
</Box>

  {/* Inside Color */}
  <Typography variant="body2" sx={{ mt: 2 }}>
    <strong>Color Inside:</strong> White
  </Typography>


  {/* Outside Color */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Color Outside:
    </Typography>
    <select
      id="door-color-outside"
      defaultValue="black"
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    >
      <option value="black">Black</option>
      <option value="white">White</option>
    </select>
  </Box>
</Box>

{/* Sales Hatch */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Sales Hatch
  </Typography>

    {/* Units */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Units:
    </Typography>
    <select
      id="sales-units"
      defaultValue="1"
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </Box>

  {/* Material */}
  <Typography variant="body2" sx={{ mt: 1 }}>
    <strong>Material:</strong> Aluminum frame 0.2-0.4 cm (0.44 cm with trim)
  </Typography>

  {/* Thickness */}
  <Typography variant="body2" sx={{ mt: 1 }}>
    <strong>Thickness:</strong> 4 cm
  </Typography>

  {/* Lock */}
  <Typography variant="body2" sx={{ mt: 1 }}>
    <strong>Lock:</strong> 2 pcs
  </Typography>

    {/* Sales Hatch 1 */}
    <Typography variant="body2" sx={{ mt: 2 }}>
    <strong>Sales Hatch 1:</strong>
  </Typography>

  {/* Width Slider */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Width:
    </Typography>
    <Slider
      id="sales-hatch-width"
      min={51}
      max={392}
      value={200} // Default value
      step={1}
      onChange={(e, value) => console.log(`Length: ${value}cm`)} // Update display dynamically
      valueLabelDisplay="auto"
    />
  </Box>

  {/* Height Slider */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Height:
    </Typography>
    <Slider
      id="sales-hatch-height"
      min={50}
      max={220}
      value={120} // Default value
      step={1}
      onChange={(e, value) => console.log(`Width: ${value}cm`)} // Update display dynamically
      valueLabelDisplay="auto"
    />
  </Box>

    {/* From Left to Right */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      From Left to Right:
    </Typography>
    <Slider
      id="sales-hatch-right-to-left"
      min={8}
      max={392}
      value={95}
      step={1}
      onChange={(e, value) => console.log(`From Left to Right: ${value} cm`)}
      valueLabelDisplay="auto"
    />
  </Box>

    {/* From Right to Left*/}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      From Right to Left:
    </Typography>
    <Slider
      id="sales-hatch-right-to-left"
      min={8}
      max={392}
      value={105}
      step={1}
      onChange={(e, value) => console.log(`From Right to Left: ${value} cm`)}
      valueLabelDisplay="auto"
    />
  </Box>

      {/* From Top to the Roof */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      From Top to the Roof:
    </Typography>
    <Slider
      id="sales-hatch-top-to-roof"
      min={10}
      max={92}
      value={36}
      step={1}
      onChange={(e, value) => console.log(`From Top to Bottom: ${value} cm`)}
      valueLabelDisplay="auto"
    />
  </Box>

    {/* From Bottom to the Floor*/}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      From Bottom to the Floor:
    </Typography>
    <Slider
      id="sales-hatch-bottom-to-floor"
      min={10}
      max={92}
      value={66}
      step={1}
      onChange={(e, value) => console.log(`From Right to Left: ${value} cm`)}
      valueLabelDisplay="auto"
    />
  </Box>

  {/* Hang */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Hang:
    </Typography>
    <select
      id="sales-hatch-hang"
      defaultValue="bottom-up" // Default selection
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    >
      <option value="bottom-up">Bottom UP</option>
      <option value="top-down">Top DOWN</option>
    </select>
  </Box>

    {/* Placement */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Placement:
    </Typography>
    <select
      id="sales-hatch-placement"
      defaultValue="2" // Default selection
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    >
      <option value="1">Elevation 1</option>
      <option value="2">Elevation 2</option>
      <option value="3">Elevation 3</option>
      <option value="4">Elevation 4</option>
    </select>
  </Box>

  {/* Inside Color */}
  <Typography variant="body2" sx={{ mt: 2 }}>
    <strong>Color Inside:</strong> White
  </Typography>

  {/* Outside Color */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Outside:
    </Typography>
    <select
      id="sales-hatch-color-outside"
      defaultValue="black"
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    >
      <option value="black">Black</option>
      <option value="white">White</option>
    </select>
  </Box>
</Box>


{/* Window Section */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Window
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Sliding
    </Typography>
    <select
      id="window-selection"
      defaultValue="yes" // Default selection
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    >
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </Box>
  <Typography variant="body2" sx={{ mt: 1 }}>
    Load-bearing panel: 22 cm, aluminum trim 6 cm
  </Typography>
  <Typography variant="body2" sx={{ mt: 1 }}>
    Service desk, outside: Foldable
  </Typography>
</Box>

{/* Additional Features */}
<Box className="form-section" sx={{ mt: 2 }}>
  <Typography variant="body2" sx={{ mb: 1 }}>
    <strong>Ventilation Grill:</strong>
  </Typography>
  <select id="ventilation-grill-selection" style={{ width: '100%' }}>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</Box>
</Box>

{/* Step 3: Systems */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h5" gutterBottom>
    Step 3: Systems
  </Typography>

    {/* Install Electrical System */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        <strong>Install Electrical System:</strong>
      </Typography>
      <select
        id="electrical-installed"
        defaultValue="yes"
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </Box>

        {/* Panel Location */}
        <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        <strong>Panel:</strong>
      </Typography>
      <input
        type="text"
        id="panel-location"
        placeholder="Specify location (above shelf in cleaning cabinet 1)"
        style={{
          width: '100%',
          padding: '0.5rem',
          marginTop: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </Box>

    {/* Power Supply */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        <strong>Power Supply:</strong>
      </Typography>
      <select
        id="power-supply"
        defaultValue="32A_3-phase"
        style={{
          padding: '0.5rem',
          marginTop: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      >
        <option value="32A_3-phase">32A, 3-phase</option>
        <option value="64A">64A, 3-phase</option>
        <option value="16A_1-phase">16A, 1-phase</option>
      </select>
    </Box>

  {/* Spotlights */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Spotlights:</strong>
    </Typography>
    <Box sx={{ ml: 2, mt: 1 }}>
      <Typography variant="body2">
        Ceiling: 
        <input
          type="number"
          id="ceiling-spotlights"
          value={Math.ceil(exteriorLength * 4)} // Calculated as 4 pcs per 100cm
          min="0"
          style={{
            width: '60px',
            marginLeft: '10px',
            padding: '0.2rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        /> pcs
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Shelve Window: 
        <select
          id="window-spotlights-toggle"
          defaultValue="yes"
          style={{
            padding: '0.3rem',
            marginLeft: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {/** Default: 3 pcs per 100cm of shelf length */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Units:</strong>
          <input
            type="number"
            id="window-spotlights"
            value={Math.ceil(exteriorLength / 0.7)}
            min="0"
            disabled={document.getElementById('window-spotlights-toggle')?.value === 'no'}
            style={{
              width: '60px',
              marginLeft: '10px',
              padding: '0.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          /> pcs
        </Typography>
      </Typography>
    </Box>
  </Box>

{/* Wall Sockets */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Wall Sockets
  </Typography>

  {/* 230V Sockets */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>230V Sockets:</strong>
    </Typography>
    <Box sx={{ ml: 2, mt: 1 }}>
      <Typography variant="body2">
        Total Units:
        <input
          type="number"
          id="wall-sockets-230v"
          defaultValue={13}
          min="0"
          style={{
            width: '60px',
            marginLeft: '10px',
            padding: '0.2rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        /> pcs
      </Typography>
      
      {/* Single Sockets */}
      <Typography variant="body2">
        <strong>Single Sockets:</strong> 3 pcs
      </Typography>
      {[1, 2, 3].map((unit) => (
        <Box key={`single-socket-${unit}`} sx={{ mt: 1 }}>
          <Typography variant="body2">Unit {unit}:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Position:
            </Typography>
            <select
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginRight: '10px',
              }}
              defaultValue="Bottom"
            >
              <option value="Bottom">Bottom</option>
              <option value="Middle">Middle</option>
              <option value="Top">Top</option>
            </select>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Location:
            </Typography>
            <select
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
              defaultValue="E4"
            >
              <option value="E1">E1</option>
              <option value="E2">E2</option>
              <option value="E3">E3</option>
              <option value="E4">E4</option>
            </select>
            <Typography variant="body2" sx={{ ml: 2 }}>
              Distance:
            </Typography>
            <input
              type="number"
              min="0"
              max="392"
              defaultValue={unit === 1 ? 67.5 : unit === 2 ? 62.5 : 108}
              style={{
                width: '60px',
                marginLeft: '10px',
                padding: '0.2rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />{' '}
            cm
          </Box>
        </Box>
      ))}

      {/* Double Sockets */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        <strong>Double Sockets:</strong> 5 pcs
      </Typography>
      {[1, 2, 3, 4, 5].map((unit) => (
        <Box key={`double-socket-${unit}`} sx={{ mt: 1 }}>
          <Typography variant="body2">Unit {unit}:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Position:
            </Typography>
            <select
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginRight: '10px',
              }}
              defaultValue="Bottom"
            >
              <option value="Bottom">Bottom</option>
              <option value="Middle">Middle</option>
              <option value="Top">Top</option>
            </select>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Location:
            </Typography>
            <select
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
              defaultValue={unit % 2 === 0 ? 'E3' : 'E4'}
            >
              <option value="E1">E1</option>
              <option value="E2">E2</option>
              <option value="E3">E3</option>
              <option value="E4">E4</option>
            </select>
            <Typography variant="body2" sx={{ ml: 2 }}>
              Distance:
            </Typography>
            <input
              type="number"
              min="0"
              max="392"
              defaultValue={
                unit === 1
                  ? 135
                  : unit === 2
                  ? 151
                  : unit === 3
                  ? 37
                  : unit === 4
                  ? 197
                  : 97
              }
              style={{
                width: '60px',
                marginLeft: '10px',
                padding: '0.2rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />{' '}
            cm
          </Box>
        </Box>
      ))}
    </Box>
  </Box>

  {/* 380V Sockets */}
  <Box sx={{ mt: 4 }}>
    <Typography variant="body2">
      <strong>380V Sockets:</strong> Total Units: 2 pcs
    </Typography>
    {[1, 2].map((unit) => (
      <Box key={`380v-socket-${unit}`} sx={{ mt: 1 }}>
        <Typography variant="body2">Unit {unit}:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Position:
          </Typography>
          <select
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginRight: '10px',
            }}
            defaultValue="Bottom"
          >
            <option value="Bottom">Bottom</option>
            <option value="Middle">Middle</option>
            <option value="Top">Top</option>
          </select>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Location:
          </Typography>
          <select
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            defaultValue="E3"
          >
            <option value="E1">E1</option>
            <option value="E2">E2</option>
            <option value="E3">E3</option>
            <option value="E4">E4</option>
          </select>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Distance:
          </Typography>
          <input
            type="number"
            min="0"
            max="392"
            defaultValue={unit === 1 ? 187 : 87}
            style={{
              width: '60px',
              marginLeft: '10px',
              padding: '0.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />{' '}
          cm
        </Box>
      </Box>
    ))}
  </Box>
</Box>

{/* Hot/Cold Water System */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Hot/Cold Water System
  </Typography>

  {/* Install Option */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      Install Hot/Cold Water System:
      <select
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginLeft: '10px',
        }}
        defaultValue="Yes"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </Typography>
  </Box>

  {/* Units */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      Units:
      <input
        type="number"
        min="1"
        defaultValue="1"
        style={{
          width: '60px',
          marginLeft: '10px',
          padding: '0.2rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />{' '}
      pcs
    </Typography>
  </Box>

    {/* Sewage */}
    <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Sewage</strong>
    </Typography>
  </Box>

  {/* Water Heater */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Water Heater</strong>
    </Typography>
  </Box>

  
      {/* Floor Drain Cover */}
      <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Floor drain cover</strong>
    </Typography>
  </Box>


  {/* Freshwater Tank */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Freshwater Tank:</strong> 30 L
    </Typography>
  </Box>

  {/* Wastewater Tank */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Wastewater Tank:</strong> 30 L
    </Typography>
  </Box>

    {/* Double Sink 1 */}
    <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Double Sink 1:</strong>
    </Typography>
    <Typography variant="body2" sx={{ ml: 2 }}>
      Placement: 
      <input
        type="text"
        defaultValue="Start of E3: 0 → 80 cm, left side of Workbench 3"
        style={{
          width: '300px',
          marginLeft: '10px',
          padding: '0.2rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </Typography>
  </Box>


{/* Water Connection */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2">
    <strong>Water Connection:</strong> Required for Dishwasher
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginLeft: '10px',
      }}
      defaultValue="Yes"
    >
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </Typography>
</Box>

  {/* Sink Cabinet */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Sink Cabinet:</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">Material: Plywood</Typography>
      <Typography variant="body2">Thickness: 4 cm</Typography>
      <Typography variant="body2">Aluminum Trim</Typography>
      <Typography variant="body2">Door Lock: 2 pcs</Typography>
      <Typography variant="body2">
  Width:
  <select
    defaultValue="80"
    style={{
      width: '70px',
      marginLeft: '10px',
      padding: '0.2rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    }}
  >
    <option value="80">80 cm</option>
    <option value="60">60 cm GN Box</option>
  </select>
</Typography>

      <Typography variant="body2">Depth: 60 cm</Typography>
      <Typography variant="body2">Height: 90 cm</Typography>
      <Typography variant="body2">Position: 86 cm above the floor</Typography>
    </Box>
  </Box>

  {/* Colors */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Colors:</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">
        Exterior Color:
        <select
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginLeft: '10px',
          }}
          defaultValue="White"
        >
          <option value="White">White</option>
          <option value="Grey">Grey</option>
          <option value="Black">Black</option>
        </select>
      </Typography>
      <Typography variant="body2">
        Interior Color:
        <select
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginLeft: '10px',
          }}
          defaultValue="White"
        >
          <option value="White">White</option>
          <option value="Grey">Grey</option>
          <option value="Black">Black</option>
        </select>
      </Typography>
    </Box>
  </Box>
</Box>

{/* Fan System */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Fan System
  </Typography>

  {/* Install Fan System */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Install Fan System:</strong>
    </Typography>
    <select
      id="install-fan-system"
      defaultValue="Yes"
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginLeft: '10px',
      }}
    >
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </Box>

    {/* Units */}
    <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      Units:
      <input
        type="number"
        min="1"
        defaultValue="1"
        style={{
          width: '60px',
          marginLeft: '10px',
          padding: '0.2rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />{' '}
      pcs
    </Typography>
  </Box>

  {/* General Features */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Material:</strong> Stainless Steel
    </Typography>
    <Typography variant="body2">
      <strong>Covers:</strong> Removable
    </Typography>
  </Box>

      {/* Fan 1 */}
      <Typography variant="body2" sx={{ mt: 2 }}>
    <strong>Fan 1:</strong>
  </Typography>


  {/* Ventilation Hood */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Ventilation Hood:</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">
        Length:
        <select
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginLeft: '10px',
          }}
          defaultValue="2"
        >
          {['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4'].map((length) => (
            <option key={length} value={length}>
              {length} meter
            </option>
          ))}
        </select>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Depth: 60 cm
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Height: 78 cm below the ceiling
      </Typography>
    </Box>
  </Box>

  {/* Optional Placement Field */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2" sx={{ mt: 1 }}>
   Placement: Above Workbench 1
  </Typography>
  <input
    type="text"
    placeholder="Enter placement (e.g., Near Window, Centered, etc.)"
    style={{
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
      maxWidth: '300px', // Optional: to limit input width
    }}
  />
</Box>

  {/* Motor */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Motor:</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">
        Type:
        <select
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginLeft: '10px',
          }}
          defaultValue="Ceiling Mounted"
        >
          <option value="Ceiling Mounted">Ceiling Mounted</option>
          <option value="Wall Mounted">Wall Mounted</option>
        </select>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Units:
        <input
          type="number"
          defaultValue={2}
          min="1"
          style={{
            width: '60px',
            marginLeft: '10px',
            padding: '0.2rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />{' '}
        pcs
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Position: 38 cm above the roof
      </Typography>
    </Box>
  </Box>

{/* Speed Regulator */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2">
    <strong>Speed Regulator:</strong>
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '150px',
      }}
      defaultValue="Yes"
    >
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </Box>
</Box>



{/* A/C System */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    A/C System
  </Typography>

  {/* Install Option */}
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">
      <strong>Install:</strong>
    </Typography>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '150px',
        marginTop: '10px',
      }}
      defaultValue="Yes"
    >
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </Box>

  {/* Units */}
  <Box sx={{ ml: 2, mt: 2 }}>
    <Typography variant="body2">
      <strong>Units:</strong>
    </Typography>
    <input
      type="number"
      defaultValue={1}
      min="1"
      style={{
        width: '60px',
        marginLeft: '10px',
        padding: '0.2rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    />{' '}
    pcs
  </Box>

  {/* A/C Specifications */}
  <Box sx={{ mt: 3 }}>
    <Typography variant="body2">
      <strong>A/C 1:</strong>
    </Typography>
    <Box sx={{ ml: 2, mt: 1 }}>
      <Typography variant="body2">Specs: 3.5 kWh</Typography>
      <Typography variant="body2">Weight: 50 kg</Typography>
    </Box>

    {/* Internal Dimensions */}
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">
        <strong>Internal Dimensions:</strong> 80 x 20 x 27 cm
      </Typography>
    </Box>

    {/* Placement Options */}
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">
        <strong>Placement:</strong>
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginTop: '10px',
          marginRight: '10px',
        }}
        defaultValue="Top E3"
      >
        <optgroup label="Top">
          <option value="Top E1">Top E1</option>
          <option value="Top E2">Top E2</option>
          <option value="Top E3">Top E3</option>
          <option value="Top E4">Top E4</option>
        </optgroup>
        <optgroup label="Middle">
          <option value="Middle E1">Middle E1</option>
          <option value="Middle E2">Middle E2</option>
          <option value="Middle E3">Middle E3</option>
          <option value="Middle E4">Middle E4</option>
        </optgroup>
        <optgroup label="Bottom">
          <option value="Bottom E1">Bottom E1</option>
          <option value="Bottom E2">Bottom E2</option>
          <option value="Bottom E3">Bottom E3</option>
          <option value="Bottom E4">Bottom E4</option>
        </optgroup>
      </select>
    </Box>

    {/* Left to Right Slider */}
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">Left to Right:</Typography>
      <Slider
        defaultValue={71}
        min={0}
        max={392}
        step={1}
        valueLabelDisplay="auto"
        sx={{ width: '300px' }}
      />
    </Box>

    {/* Right to Left Slider */}
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">Right to Left:</Typography>
      <Slider
        defaultValue={71}
        min={0}
        max={392}
        step={1}
        valueLabelDisplay="auto"
        sx={{ width: '300px' }}
      />
    </Box>
  </Box>

    {/* External Dimensions */}
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">
        <strong>External Dimensions:</strong> 80 x 30 x 56 cm
      </Typography>
    </Box>

    {/* Placement Options */}
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">
        <strong>Placement:</strong>
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginTop: '10px',
          marginRight: '10px',
        }}
        defaultValue="Top E3"
      >
        <optgroup label="Top">
          <option value="Top E1">Top E1</option>
          <option value="Top E2">Top E2</option>
          <option value="Top E3">Top E3</option>
          <option value="Top E4">Top E4</option>
        </optgroup>
        <optgroup label="Middle">
          <option value="Middle E1">Middle E1</option>
          <option value="Middle E2">Middle E2</option>
          <option value="Middle E3">Middle E3</option>
          <option value="Middle E4">Middle E4</option>
        </optgroup>
        <optgroup label="Bottom">
          <option value="Bottom E1">Bottom E1</option>
          <option value="Bottom E2">Bottom E2</option>
          <option value="Bottom E3">Bottom E3</option>
          <option value="Bottom E4">Bottom E4</option>
        </optgroup>
      </select>
    </Box>

    {/* Left to Right Slider */}
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">Left to Right:</Typography>
      <Slider
        defaultValue={75}
        min={0}
        max={392}
        step={1}
        valueLabelDisplay="auto"
        sx={{ width: '300px' }}
      />
    </Box>

    {/* Right to Left Slider */}
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">Right to Left:</Typography>
      <Slider
        defaultValue={75}
        min={0}
        max={392}
        step={1}
        valueLabelDisplay="auto"
        sx={{ width: '300px' }}
      />
    </Box>
  </Box>

  {/* Mounting Construction Outside */}
  <Box sx={{ mt: 3 }}>
    <Typography variant="body2">
      <strong>Mounting Construction Outside:</strong>
    </Typography>
    <Box sx={{ ml: 2, mt: 1 }}>
      <Typography variant="body2">Material: Steel</Typography>
      <Typography variant="body2">Dimensions: 54 x 30 x 42 cm</Typography>
    </Box>
  </Box>
</Box>

{/* AL-KO MAMMUT Manoeuvring System */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    AL-KO MAMMUT Manoeuvring System
  </Typography>

  {/* Factory Install */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Factory Install:</strong>
    </Typography>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '150px',
        marginTop: '10px',
      }}
      defaultValue="Yes"
    >
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </Box>

  {/* General Features */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>General Features:</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">Weight: 70 kg</Typography>
    </Box>
  </Box>

  {/* Power System */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Power System:</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">Location: Under the sink</Typography>
      <Typography variant="body2">Control Box: Remote</Typography>
      <Typography variant="body2">Charger: Included</Typography>
    </Box>
  </Box>

  {/* Battery */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">
      <strong>Battery:</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">Type: AGM 12V / Max 120Ah</Typography>
      <Typography variant="body2">Battery Weight: 30 kg</Typography>
    </Box>
  </Box>
</Box>

{/* Step 4: Interior */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h5" gutterBottom>
    Step 4: Interior
  </Typography>

{/* Shelves Configuration */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Shelves
  </Typography>

  {/* Shelves Toggle */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Shelves: Yes/No
    </Typography>
    <input
      type="checkbox"
      defaultChecked={true} // Default Yes
      onChange={(e) =>
        console.log(`Shelves: ${e.target.checked ? 'Yes' : 'No'}`)
      }
    />
  </Box>

  {/* Material and General Info */}
  <Box sx={{ ml: 2, mt: 2 }}>
    <Typography variant="body2">Material: Plywood</Typography>
    <Typography variant="body2">Thickness: 2 cm</Typography>
    <Typography variant="body2">
      Aluminum Trim: Thickness 2 cm around the edge
    </Typography>
  </Box>

  {/* Units Dropdown */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">Units:</Typography>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '120px',
      }}
      defaultValue="2"
      onChange={(e) => console.log(`Shelves Units: ${e.target.value} pcs`)}
    >
      <option value="1">1 pcs</option>
      <option value="2">2 pcs</option>
      <option value="3">3 pcs</option>
      <option value="4">4 pcs</option>
    </select>
  </Box>

{/* Shelve 1 */}
<Box sx={{ mt: 4 }}>
  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
    Shelve 1
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    {/* Total Dimensions */}
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      Total Dimensions:
    </Typography>

    {/* Width Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Width:
      </Typography>
      <input
        type="range"
        min="100"
        max="300"
        defaultValue="200"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Width: ${e.target.value} cm`)}
      />
      <Typography variant="body2">200 cm</Typography>
    </Box>

    {/* Depth Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Depth:
      </Typography>
      <input
        type="range"
        min="20"
        max="50"
        defaultValue="30"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Depth: ${e.target.value} cm`)}
      />
      <Typography variant="body2">30 cm</Typography>
    </Box>

    {/* Position Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Blow the ceiling:
      </Typography>
      <input
        type="range"
        min="20"
        max="50"
        defaultValue="32"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Position: ${e.target.value} cm`)}
      />
      <Typography variant="body2">32 cm</Typography>
    </Box>

   {/* Placement */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
    Placement:
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Above the window or specify:
    </Typography>
    <input
      type="text"
      placeholder="Specify Placement"
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '200px',
      }}
      onChange={(e) =>
        console.log(`Specified Placement: ${e.target.value}`)
      }
    />
  </Box>



  {/* Exterior Color */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Exterior Color:
    </Typography>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '150px',
      }}
      defaultValue="White"
      onChange={(e) => console.log(`Exterior Color: ${e.target.value}`)}
    >
      <option value="White">White</option>
      <option value="Black">Black</option>
      <option value="Grey">Grey</option>
    </select>
  </Box>

  {/* Interior Color */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Interior Color:
    </Typography>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '150px',
      }}
      defaultValue="White"
      onChange={(e) => console.log(`Interior Color: ${e.target.value}`)}
    >
      <option value="White">White</option>
      <option value="Black">Black</option>
      <option value="Grey">Grey</option>
    </select>
  </Box>
</Box>

    {/* Connections */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Connections: Electric Spotlights 6 pcs
    </Typography>
  </Box>
</Box>
</Box>

{/* Shelve 2 */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Shelve 2
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    {/* Total Dimensions */}
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      Total Dimensions:
    </Typography>

    {/* Width Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Width:
      </Typography>
      <input
        type="range"
        min="100"
        max="200"
        defaultValue="142"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Width: ${e.target.value} cm`)}
      />
      <Typography variant="body2">142 cm</Typography>
    </Box>

    {/* Depth Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Depth:
      </Typography>
      <input
        type="range"
        min="20"
        max="50"
        defaultValue="30"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Depth: ${e.target.value} cm`)}
      />
      <Typography variant="body2">30 cm</Typography>
    </Box>

    {/* Position Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Below the ceiling:
      </Typography>
      <input
        type="range"
        min="20"
        max="50"
        defaultValue="32"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Position: ${e.target.value} cm`)}
      />
      <Typography variant="body2">32 cm</Typography>
    </Box>

    {/* Placement */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        Placement:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Above the double sink or specify:
        </Typography>
        <input
          type="text"
          placeholder="Specify Placement"
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '200px',
          }}
          onChange={(e) =>
            console.log(`Specified Placement: ${e.target.value}`)
          }
        />
      </Box>
    </Box>

    {/* Colors */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        Colors:
      </Typography>

      {/* Exterior Color Dropdown */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Exterior Color:
        </Typography>
        <select
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '150px',
          }}
          defaultValue="White"
          onChange={(e) => console.log(`Exterior Color: ${e.target.value}`)}
        >
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Grey">Grey</option>
        </select>
      </Box>

      {/* Interior Color Dropdown */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Interior Color:
        </Typography>
        <select
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '150px',
          }}
          defaultValue="White"
          onChange={(e) => console.log(`Interior Color: ${e.target.value}`)}
        >
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Grey">Grey</option>
        </select>
      </Box>
    </Box>
  </Box>
</Box>


  {/* Cabinets */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Cabinets
  </Typography>

  {/* Cabinet Toggle */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Cabinets: Yes/No
    </Typography>
    <input
      type="checkbox"
      defaultChecked={true} // Default Yes
      onChange={(e) =>
        console.log(`Cabinets: ${e.target.checked ? 'Yes' : 'No'}`)
      }
    />
  </Box>

  {/* Material */}
  <Typography variant="body2" sx={{ mt: 2 }}>
    Material: Plywood
  </Typography>

  {/* Units Dropdown */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">Units:</Typography>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '120px',
      }}
      defaultValue="1"
      onChange={(e) => console.log(`Units: ${e.target.value} pcs`)}
    >
      <option value="1">1 pcs</option>
      <option value="2">2 pcs</option>
      <option value="3">3 pcs</option>
      <option value="4">4 pcs</option>
    </select>
  </Box>

  {/* Unit 1 */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      Unit 1: ID C-01
    </Typography>
  {/* Cabinet Toggle */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Cleaning Cabinet: Yes/No
    </Typography>
    <input
      type="checkbox"
      defaultChecked={true} // Default Yes
      onChange={(e) =>
        console.log(`Cabinets: ${e.target.checked ? 'Yes' : 'No'}`)
      }
    />
  </Box>
    <Box sx={{ ml: 2, mt: 1 }}>
      {/* Total Dimensions */}
      <Typography variant="body2" sx={{ mt: 1 }}>
        Total Dimensions:
      </Typography>
      {/* Width Slider */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Width:
        </Typography>
        <input
          type="range"
          min="30"
          max="80"
          defaultValue="40"
          style={{ marginRight: '10px', width: '60%' }}
          onChange={(e) => console.log(`Width: ${e.target.value} cm`)}
        />
        <Typography variant="body2">40 cm</Typography>
      </Box>
  

      {/* Height Slider */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Height:
        </Typography>
        <input
          type="range"
          min="150"
          max="240"
          defaultValue="220"
          style={{ marginRight: '10px', width: '60%' }}
          onChange={(e) => console.log(`Height: ${e.target.value} cm`)}
        />
        <Typography variant="body2">220 cm</Typography>
      </Box>

      {/* Placement */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Placement: Left of workbench 2 ID WB-02
      </Typography>

      {/* Cabinet Details */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Thickness: 2 mm
      </Typography>
      <Typography variant="body2">Exterior Color: White</Typography>
      <Typography variant="body2">Interior Color: White</Typography>
      <Typography variant="body2">
        Aluminum Trim: Thickness 2 cm Around edges
      </Typography>
    </Box>
  </Box>

  {/* Shelve for Cabinet */}
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      Shelve for Cabinet
    </Typography>
    {/* Include Shelve Toggle */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Include Shelve: Yes/No
      </Typography>
      <input
        type="checkbox"
        defaultChecked={true}
        onChange={(e) =>
          console.log(`Include Shelve: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>
      {/* Units Dropdown */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">Units:</Typography>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '120px',
      }}
      defaultValue="1"
      onChange={(e) => console.log(`Units: ${e.target.value} pcs`)}
    >
      <option value="1">1 pcs</option>
      <option value="2">2 pcs</option>
      <option value="3">3 pcs</option>
      <option value="4">4 pcs</option>
    </select>
  </Box>
    <Box sx={{ ml: 2, mt: 2 }}>
      <Typography variant="body2">Material: Plywood</Typography>
      <Typography variant="body2">Thickness: 2 cm</Typography>
      <Typography variant="body2">Unit 1:</Typography>
    </Box>
          {/* Height Slider */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Below the Ceiling:
        </Typography>
        <input
          type="range"
          min="150"
          max="240"
          defaultValue="220"
          style={{ marginRight: '10px', width: '60%' }}
          onChange={(e) => console.log(`Height: ${e.target.value} cm`)}
        />
        <Typography variant="body2">32 cm</Typography>
      </Box>
  </Box>
</Box>

{/* Cabinet Door */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Cabinet Door
  </Typography>
  <Box sx={{ ml: 2, mt: 2 }}>
    {/* Number of Doors Dropdown */}
    <Typography variant="body2">Number of Doors:</Typography>
    <select
      style={{
        padding: '0.5rem',
        marginTop: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '120px',
      }}
      defaultValue="1"
      onChange={(e) => console.log(`Cabinet Doors: ${e.target.value} pcs`)}
    >
      <option value="1">1 pcs</option>
      <option value="2">2 pcs</option>
      <option value="3">3 pcs</option>
      <option value="4">4 pcs</option>
    </select>
    <Box sx={{ ml: 2, mt: 1 }}>
      <Typography variant="body2">Thickness: 2 mm</Typography>
      <Typography variant="body2">
        Aluminum Trim: Thickness 2 cm Around edges
      </Typography>
      <Typography variant="body2">Door Lock: 1 pcs</Typography>
      {/* Hang Dropdown */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Hang:
        </Typography>
        <select
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '120px',
          }}
          defaultValue="Right"
          onChange={(e) => console.log(`Hang: ${e.target.value}`)}
        >
          <option value="Right">Right</option>
          <option value="Left">Left</option>
          <option value="Left">Top to Bottom</option>
          <option value="Left">Bottom Up</option>
        </select>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Exterior Color: White
      </Typography>
      <Typography variant="body2">Interior Color: White</Typography>
    </Box>
  </Box>
  </Box>


{/* Workbench */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Workbench
  </Typography>
  <Typography variant="body2">Material: Plywood</Typography>

  {/* Workbench Overview */}
  <Box sx={{ mt: 4 }}>
    <Typography variant="body2">
      <strong>Units:</strong>
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <input
        type="number"
        id="workbench-units"
        min="1"
        max="4"
        defaultValue="4"
        style={{
          width: '60px',
          marginLeft: '10px',
          padding: '0.2rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />{' '}
      pcs
    </Box>
  </Box>

{/* Workbench 1 */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Workbench 1
  </Typography>

  {/* Divided Toggle */}
  <Typography variant="body2" sx={{ mt: 2 }}>
    Divided: Yes/No 
    <input
      type="checkbox"
      id="workbench-1-divided-toggle"
      defaultnotChecked
      style={{ marginLeft: '10px' }}
      onChange={(e) => {
        console.log(`Workbench 1 Divided: ${e.target.checked ? 'Yes' : 'No'}`);
      }}
    />
  </Typography>
    <Typography variant="body2" sx={{ mt: 2 }}>
      <strong>Total Dimensions:</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      {/* Width Slider */}
      <Typography variant="body2">
        Width:
        <input
          type="range"
          min="100"
          max="300"
          defaultValue="200"
          style={{ margin: '10px', width: '60%' }}
          onChange={(e) => console.log(`Width: ${e.target.value} cm`)}
        />
        <span>{' '}200 cm</span>
      </Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">
      Height:
      <input
        type="range"
        min="60"
        max="100"
        defaultValue="70"
        style={{ margin: '10px', width: '60%' }}
      />
      70 cm
    </Typography>
{/* Workbench 1 Placement */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2">
    <strong>Placement:</strong>
  </Typography>
  <input
    type="text"
    id="workbench-1-placement"
    placeholder="Below the fan"
    style={{
      width: '100%',
      padding: '0.5rem',
      marginTop: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    }}
  />
</Box>

{/* Upper Part */}
<Box sx={{ mt: 4 }}>
  <Typography variant="body2">
    <strong>Upper Part</strong>
  </Typography>
  <Box sx={{ ml: 2 }}>
    <Typography variant="body2">Thickness: 4 mm</Typography>
    <Typography variant="body2">
      Position:
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <input
          type="range"
          min="60"
          max="80"
          defaultValue="66"
          style={{ margin: '10px', width: '60%' }}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Typography variant="body2" sx={{ ml: 2 }}>
          {position} cm
        </Typography>
      </Box>
      cm above the floor
    </Typography>
    <Typography variant="body2">
  Top
  <select
    style={{
      padding: '0.5rem',
      marginLeft: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    }}
    defaultValue="Stainless Steel Cover"
  >
    <option value="Stainless Steel Cover">Stainless Steel Cover</option>
    <option value="Grey">Grey Color</option>
  </select>
</Typography>
<Typography variant="body2">Bottom Color: Plywood</Typography>

      <Box sx={{ ml: 2 }}>
        <Typography variant="body2">Aluminum Trim: Thickness 4 cm Around the edges</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
    {/* Cable Grommet */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        Cable Grommet:
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="Without Brush"
      >
        <option value="With Brush">With Brush</option>
        <option value="Without Brush">Without Brush</option>
      </select>
    </Box>
</Typography>
<Box sx={{ ml: 2, mt: 1 }}>
  <Typography variant="body2">
    Units:
    <select
      style={{
        padding: '0.5rem',
        marginLeft: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100px',
      }}
      defaultValue="2"
    >
      <option value="1">1 pcs</option>
      <option value="2">2 pcs</option>
      <option value="3">3 pcs</option>
      <option value="4">4 pcs</option>
    </select>
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
      {/* Unit 1 */}
      <Typography variant="body2">
        <strong>Unit 1:</strong> Square Diameter 10 cm
      </Typography>

      {/* Left to Right Slider for Unit 1 */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Left to Right:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <input
          type="range"
          min="0"
          max="100"
          value={unit1LeftToRight}
          onChange={(e) => setUnit1LeftToRight(e.target.value)}
          style={{ margin: '10px', width: '60%' }}
        />
        <Typography variant="body2" sx={{ ml: 2 }}>
          {unit1LeftToRight} cm
        </Typography>
      </Box>

      {/* Wall to Edge Slider for Unit 1 */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Wall to Edge:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <input
          type="range"
          min="0"
          max="100"
          value={unit1WallToEdge}
          onChange={(e) => setUnit1WallToEdge(e.target.value)}
          style={{ margin: '10px', width: '60%' }}
        />
        <Typography variant="body2" sx={{ ml: 2 }}>
          {unit1WallToEdge} cm
        </Typography>
      </Box>

      {/* Unit 2 */}
      <Typography variant="body2" sx={{ mt: 4 }}>
        <strong>Unit 2:</strong> Square Diameter 10 cm
      </Typography>

      {/* Right to Left Slider for Unit 2 */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Right to Left:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <input
          type="range"
          min="0"
          max="100"
          value={unit2RightToLeft}
          onChange={(e) => setUnit2RightToLeft(e.target.value)}
          style={{ margin: '10px', width: '60%' }}
        />
        <Typography variant="body2" sx={{ ml: 2 }}>
          {unit2RightToLeft} cm
        </Typography>
      </Box>

      {/* Wall to Edge Slider for Unit 2 */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Wall to Edge:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <input
          type="range"
          min="0"
          max="100"
          value={unit2WallToEdge}
          onChange={(e) => setUnit2WallToEdge(e.target.value)}
          style={{ margin: '10px', width: '60%' }}
        />
        <Typography variant="body2" sx={{ ml: 2 }}>
          {unit2WallToEdge} cm
        </Typography>
      </Box>
      </Box>
      </Box>
      </Box>
      </Box>

  {/* Middle Part */}
  <Box sx={{ mt: 4 }}>
    <Typography variant="body2">
      <strong>Middle Part</strong>
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">Thickness: 2 mm</Typography>
      <Typography variant="body2">Depth: 60 cm</Typography>
      <Typography variant="body2">Height: 66 cm</Typography>
      <Typography variant="body2">Outside Color: White</Typography>
      <Typography variant="body2">Inside Color: White</Typography>
      <Typography variant="body2">Aluminum Trim: Thickness 2 cm around the edge</Typography>
    </Box>
  </Box>

  {/* Right Part */}
  <Box sx={{ mt: 4 }}>
    <Typography variant="body2">
      <strong>Right Part:</strong> Connected to Workbench 3
    </Typography>
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2">Thickness: 2 mm</Typography>
      <Typography variant="body2">Depth: 60 cm</Typography>
      <Typography variant="body2">Height: 66 cm</Typography>
      <Typography variant="body2">Outside Color: White</Typography>
      <Typography variant="body2">Inside Color: White</Typography>
      <Typography variant="body2">Aluminum Trim: Thickness: 2 cm around the edge</Typography>
    </Box>
  </Box>

  {/* Include Lower Shelf Toggle */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Include Lower Shelf:
    </Typography>
    <input
      type="checkbox"
      id="lower-shelf-toggle"
      defaultChecked
      onChange={(e) => {
        const details = document.getElementById('lower-shelf-details');
        details.style.display = e.target.checked ? 'block' : 'none';
        console.log(
          `Lower Shelf Included: ${e.target.checked ? 'Yes' : 'No'}`
        );
      }}
    />
  </Box>

  {/* Additional Features Toggles */}
  <Box sx={{ ml: 2, mt: 2 }}>
    {/* Toggle for Cabinet Door */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Cabinet Door:
      </Typography>
      <input
        type="checkbox"
        id="cabinet-door-toggle"
        onChange={(e) =>
          console.log(
            `Cabinet Door Included: ${e.target.checked ? 'Yes' : 'No'}`
          )
        }
      />
    </Box>

    {/* Toggle for Drawer */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Drawer:
      </Typography>
      <input
        type="checkbox"
        id="drawer-toggle"
        onChange={(e) =>
          console.log(`Drawer Included: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>

    {/* Toggle for Box Below */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Box Below:
      </Typography>
      <input
        type="checkbox"
        id="box-below-toggle"
        onChange={(e) =>
          console.log(`Box Below Included: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>
  </Box>

  {/* Lower Shelf Details */}
  <Box id="lower-shelf-details" sx={{ ml: 2, mt: 2 }}>
    <Typography variant="body2">Thickness: 2 cm</Typography>
    <Typography variant="body2">Width: 100 cm</Typography>
    <Typography variant="body2">Depth: 56 cm</Typography>
    <Typography variant="body2">Height: 35 cm</Typography>
    <Typography variant="body2">Above the floor: 33 cm</Typography>
    <Typography variant="body2">Below the upper bench: 31 cm</Typography>
    <Typography variant="body2">Top Color: White</Typography>
    <Typography variant="body2">Bottom Color: White</Typography>
    <Typography variant="body2">
      Aluminum Protection Trim: Height 1 cm on the edge
    </Typography>
  </Box>
</Box>

{/* Workbench 2 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" gutterBottom>
    Workbench 2
  </Typography>

  {/* Divided Toggle */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Divided: Yes/No
    </Typography>
    <input
      type="checkbox"
      id="workbench-2-divided-toggle"
      defaultChecked
      onChange={(e) =>
        console.log(`Workbench 2 Divided: ${e.target.checked ? 'Yes' : 'No'}`)
      }
    />
  </Box>

  {/* Total Dimensions */}
  <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
    Total Dimensions:
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    {/* Width Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Width:
      </Typography>
      <input
        type="range"
        min="100"
        max="300"
        defaultValue="200"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Width: ${e.target.value} cm`)}
      />
      <Typography variant="body2">200 cm</Typography>
    </Box>

{/* Workbench 1 Placement */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2">
    <strong>Placement:</strong>
  </Typography>
  <input
    type="text"
    id="workbench-2-palcement"
    placeholder="Below the window"
    style={{
      width: '100%',
      padding: '0.5rem',
      marginTop: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    }}
  />
</Box>
</Box>

  {/* Part 1 */}
  <Typography variant="body2" sx={{ mt: 4, fontWeight: 'bold' }}>
    Part 1 out of 2
  </Typography>

{/* Upper Part 1 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" gutterBottom>
    Upper Part 1
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 4 mm</Typography>
    <Typography variant="body2">Width: 74 cm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Height: 94 cm</Typography>
    <Typography variant="body2">Position: 90 cm above the floor</Typography>
    
    {/* Top Color Dropdown */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Top Color:
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="Grey"
      >
        <option value="Grey">Grey</option>
        <option value="Stainless Steel Cover">Stainless Steel Cover</option>
      </select>
    </Typography>

    {/* Bottom Color */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Bottom Color: Plywood
    </Typography>

    {/* Aluminum Trim */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Aluminum Trim: Thickness 4 cm around the edge
    </Typography>

    {/* Cable Grommet */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        Cable Grommet:
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="With Brush"
      >
        <option value="With Brush">With Brush</option>
        <option value="Without Brush">Without Brush</option>
      </select>
    </Box>

    {/* Units Dropdown */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        Units:
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100px',
        }}
        defaultValue="1"
      >
        <option value="1">1 pcs</option>
        <option value="2">2 pcs</option>
        <option value="3">3 pcs</option>
        <option value="4">4 pcs</option>
      </select>
    </Box>

    {/* Unit 1 */}
    <Box sx={{ mt: 4 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        Unit 1:
      </Typography>
      <Box sx={{ ml: 2, mt: 1 }}>
        <Typography variant="body2">Diameter: 6 cm</Typography>
        <Typography variant="body2">Height: 2.5 cm</Typography>

        {/* Left to Right Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Left to Right:
          </Typography>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="34"
            style={{ marginRight: '10px', width: '60%' }}
            onChange={(e) => console.log(`Left to Right: ${e.target.value} cm`)}
          />
          <Typography variant="body2">31 cm</Typography>
        </Box>

        {/* Wall to Edge Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Wall to Edge:
          </Typography>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="27"
            style={{ marginRight: '10px', width: '60%' }}
            onChange={(e) => console.log(`Wall to Edge: ${e.target.value} cm`)}
          />
          <Typography variant="body2">2 cm</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
  </Box>
  </Box>
  </Box>

{/* Left Part 1 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Left Part 1</Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 2 mm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Height: 90 cm</Typography>
    <Typography variant="body2">Outside Color: White</Typography>
    <Typography variant="body2">Inside Color: White</Typography>
    <Typography variant="body2">
      Aluminum Trim: Thickness 2 cm around the edge
    </Typography>
  </Box>
</Box>

{/* Right Part 1 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Right Part 1 (Middle of Workbench)</Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 2 mm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Height: 90 cm</Typography>
    <Typography variant="body2">Outside Color: White</Typography>
    <Typography variant="body2">Inside Color: White</Typography>
    <Typography variant="body2">
      Aluminum Trim: Thickness 2 cm around the edge
    </Typography>
  </Box>
</Box>

{/* Lower Shelf */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Lower Shelf</Typography>

  {/* Include Lower Shelf */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Include Lower Shelf:
    </Typography>
    <input
      type="checkbox"
      id="lower-shelf-toggle"
      defaultChecked
      onChange={(e) =>
        console.log(
          `Lower Shelf Included: ${e.target.checked ? 'Yes' : 'No'}`
        )
      }
    />
  </Box>

  {/* Additional Features */}
  <Box sx={{ ml: 2, mt: 2 }}>
    {/* Toggle for Cabinet Door */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Cabinet Door:
      </Typography>
      <input
        type="checkbox"
        id="cabinet-door-toggle"
        onChange={(e) =>
          console.log(
            `Cabinet Door Included: ${e.target.checked ? 'Yes' : 'No'}`
          )
        }
      />
    </Box>

    {/* Toggle for Drawer */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Drawer:
      </Typography>
      <input
        type="checkbox"
        id="drawer-toggle"
        onChange={(e) =>
          console.log(`Drawer Included: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>

    {/* Toggle for Box Below */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Box Below:
      </Typography>
      <input
        type="checkbox"
        id="box-below-toggle"
        onChange={(e) =>
          console.log(`Box Below Included: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>
  </Box>

  {/* Lower Shelve 1 */}
  <Box sx={{ mt: 4 }}>
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      Lower Shelve 1
    </Typography>
    <Box sx={{ ml: 2, mt: 1 }}>
      <Typography variant="body2">Thickness: 2 cm</Typography>
      <Typography variant="body2">Width: 70 cm</Typography>
      <Typography variant="body2">Depth: 56 cm</Typography>
      <Typography variant="body2">Height: 35 cm</Typography>
      <Typography variant="body2">Above the floor: 33 cm</Typography>
      <Typography variant="body2">
        Below the upper bench: 55 cm
      </Typography>
      <Typography variant="body2">Top Color: White</Typography>
      <Typography variant="body2">Bottom Color: White</Typography>
      <Typography variant="body2">
        Aluminum Protection Trim: Height 1 cm, Positioned on the edge
      </Typography>
    </Box>
  </Box>
</Box>

{/* Upper Part 2 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Upper Part 2</Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 4 mm</Typography>
    <Typography variant="body2">Width: 126 cm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Height: 65 cm</Typography>
    <Typography variant="body2">Position: 61 cm above the floor</Typography>
    <Typography variant="body2">
      Top Color:
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="Grey"
      >
        <option value="Grey">Grey</option>
        <option value="Stainless Steel Cover">
          Stainless Steel Cover
        </option>
      </select>
    </Typography>
    <Typography variant="body2" sx={{ mt: 2 }}>
      Bottom Color: Plywood
    </Typography>
    <Typography variant="body2">
      Aluminum Trim: Thickness 4 cm around the edge
    </Typography>
    {/* Cable Grommet */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        Cable Grommet:
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="With Brush"
      >
        <option value="With Brush">With Brush</option>
        <option value="Without Brush">Without Brush</option>
      </select>
    </Box>

    {/* Units Dropdown */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        Units:
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100px',
        }}
        defaultValue="1"
      >
        <option value="1">1 pcs</option>
        <option value="2">2 pcs</option>
        <option value="3">3 pcs</option>
        <option value="4">4 pcs</option>
      </select>
    </Box>

    {/* Unit 1 */}
    <Box sx={{ mt: 4 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        Unit 1:
      </Typography>
      <Box sx={{ ml: 2, mt: 1 }}>
        <Typography variant="body2">Diameter: 6 cm</Typography>
        <Typography variant="body2">Height: 2.5 cm</Typography>

        {/* Left to Right Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Left to Right:
          </Typography>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="57"
            style={{ marginRight: '10px', width: '60%' }}
            onChange={(e) => console.log(`Left to Right: ${e.target.value} cm`)}
          />
          <Typography variant="body2">57 cm</Typography>
        </Box>

        {/* Wall to Edge Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Wall to Edge:
          </Typography>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="2"
            style={{ marginRight: '10px', width: '60%' }}
            onChange={(e) => console.log(`Wall to Edge: ${e.target.value} cm`)}
          />
          <Typography variant="body2">2 cm</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
  </Box>


{/* Right Part 2 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Right Part 2</Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 2 mm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Height: 61 cm</Typography>
    <Typography variant="body2">
      Outside Color:
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="Grey"
      >
        <option value="Grey">Grey</option>
        <option value="Stainless Steel Cover">
          Stainless Steel Cover
        </option>
      </select>
    </Typography>
    <Typography variant="body2" sx={{ mt: 2 }}>
      Inside Color: White
    </Typography>
    <Typography variant="body2">
      Aluminum Trim: Thickness 2 cm around the edge
    </Typography>
    {/* Cable Grommet */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        Cable Grommet:
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="Without Brush"
      >
        <option value="With Brush">With Brush</option>
        <option value="Without Brush">Without Brush</option>
      </select>
    </Box>

    {/* Units Dropdown */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        Units:
      </Typography>
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100px',
        }}
        defaultValue="1"
      >
        <option value="1">1 pcs</option>
        <option value="2">2 pcs</option>
        <option value="3">3 pcs</option>
        <option value="4">4 pcs</option>
      </select>
    </Box>

    {/* Unit 1 */}
    <Box sx={{ mt: 4 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        Unit 1:
      </Typography>
      <Box sx={{ ml: 2, mt: 1 }}>
        <Typography variant="body2">Square Diameter: 10 cm</Typography>

        {/* Bottom to Top Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Bottom to Top:
          </Typography>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="35"
            style={{ marginRight: '10px', width: '60%' }}
            onChange={(e) => console.log(`Wall to Edge: ${e.target.value} cm`)}
          />
          <Typography variant="body2">35 cm</Typography>
        </Box>

        {/* Inner to Outer Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Wall to Edge:
          </Typography>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            style={{ marginRight: '10px', width: '60%' }}
            onChange={(e) => console.log(`Left to Right: ${e.target.value} cm`)}
          />
          <Typography variant="body2">0 cm</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
  </Box>

{/* Lower Shelf */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Lower Shelf</Typography>

  {/* Include Lower Shelf */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Include Lower Shelf:
    </Typography>
    <input
      type="checkbox"
      id="lower-shelf-toggle"
      defaultChecked
      onChange={(e) =>
        console.log(
          `Lower Shelf Included: ${e.target.checked ? 'Yes' : 'No'}`
        )
      }
    />
  </Box>

  {/* Additional Features */}
  <Box sx={{ ml: 2, mt: 2 }}>
    {/* Toggle for Cabinet Door */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Cabinet Door:
      </Typography>
      <input
        type="checkbox"
        id="cabinet-door-toggle"
        onChange={(e) =>
          console.log(
            `Cabinet Door Included: ${e.target.checked ? 'Yes' : 'No'}`
          )
        }
      />
    </Box>

    {/* Toggle for Drawer */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Drawer:
      </Typography>
      <input
        type="checkbox"
        id="drawer-toggle"
        onChange={(e) =>
          console.log(`Drawer Included: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>

    {/* Toggle for Box Below */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Box Below:
      </Typography>
      <input
        type="checkbox"
        id="box-below-toggle"
        onChange={(e) =>
          console.log(`Box Below Included: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>
  </Box>

  {/* Lower Shelve 2 */}
  <Box sx={{ mt: 4 }}>
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      Lower Shelve 2
    </Typography>
    <Box sx={{ ml: 2, mt: 1 }}>
      <Typography variant="body2">Thickness: 2 cm</Typography>
      <Typography variant="body2">Width: 122 cm</Typography>
      <Typography variant="body2">Depth: 56 cm</Typography>
      <Typography variant="body2">Height: 35 cm</Typography>
      <Typography variant="body2">Above the floor: 33 cm</Typography>
      <Typography variant="body2">
        Below the upper bench: 26 cm
      </Typography>
      <Typography variant="body2">Top Color: White</Typography>
      <Typography variant="body2">Bottom Color: White</Typography>
      <Typography variant="body2">
        Aluminum Protection Trim: Height 1 cm, Positioned on the edge
      </Typography>
    </Box>
  </Box>
</Box>


{/* Workbench 3 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6">Workbench 3</Typography>

  {/* Divided Toggle */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Divided:
    </Typography>
    <input
      type="checkbox"
      id="workbench-3-divided-toggle"
      onChange={(e) =>
        console.log(`Workbench 3 Divided: ${e.target.checked ? 'Yes' : 'No'}`)
      }
    />
  </Box>

  {/* Total Dimensions */}
  <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
    Total Dimensions:
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    {/* Width Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Width:
      </Typography>
      <input
        type="range"
        min="50"
        max="100"
        defaultValue="62"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Width: ${e.target.value} cm`)}
      />
      <Typography variant="body2">62 cm</Typography>
    </Box>

    {/* Depth */}
    <Typography variant="body2" sx={{ mt: 1 }}>
      Depth: 60 cm
    </Typography>

    {/* Height Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Height:
      </Typography>
      <input
        type="range"
        min="60"
        max="100"
        defaultValue="94"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Height: ${e.target.value} cm`)}
      />
      <Typography variant="body2">94 cm</Typography>
    </Box>

    {/* Placement */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Placement:
      <input
        type="text"
        id="placement-textfield"
        placeholder="Right side of Double sink 1"
        style={{
          width: '100%',
          padding: '0.5rem',
          marginTop: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </Typography>
  </Box>

  {/* Upper Part */}
  <Typography variant="body2" sx={{ mt: 4, fontWeight: 'bold' }}>
    Upper Part
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 4 mm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Above the floor: 94 cm</Typography>

    {/* Colors */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Top Color:
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="Grey"
      >
        <option value="Grey">Grey</option>
        <option value="Stainless Steel Cover">Stainless Steel Cover</option>
      </select>
    </Typography>
    <Typography variant="body2" sx={{ mt: 2 }}>
      Bottom Color: Plywood
    </Typography>
    <Typography variant="body2" sx={{ mt: 2 }}>
      Aluminum Trim: Thickness 4 cm around the edge
    </Typography>

    {/* Cable Grommet */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Cable Grommet:
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="With Brush"
      >
        <option value="With Brush">With Brush</option>
        <option value="Without Brush">Without Brush</option>
      </select>
    </Typography>

    {/* Units Dropdown */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Units:
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="1"
      >
        <option value="1">1 pcs</option>
        <option value="2">2 pcs</option>
        <option value="3">3 pcs</option>
        <option value="4">4 pcs</option>
      </select>
    </Typography>

    {/* Unit 1 */}
    <Box sx={{ mt: 4 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        Unit 1:
      </Typography>
      <Box sx={{ ml: 2, mt: 1 }}>
        <Typography variant="body2">Diameter: 6 cm</Typography>
        <Typography variant="body2">Height: 2.5 cm</Typography>

    {/* Left to Right */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Left to Right:
      </Typography>
      <input
        type="range"
        min="10"
        max="50"
        defaultValue="25"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Left to Right: ${e.target.value} cm`)}
      />
      <Typography variant="body2">25 cm</Typography>
    </Box>

    {/* Wall to Edge */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Wall to Edge:
      </Typography>
      <input
        type="range"
        min="0"
        max="10"
        defaultValue="2"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Wall to Edge: ${e.target.value} cm`)}
      />
      <Typography variant="body2">2 cm</Typography>
    </Box>
  </Box>
</Box>

  {/* Left Part */}
  <Typography variant="body2" sx={{ mt: 4, fontWeight: 'bold' }}>
    Left Part: Connected to Workbench 1
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 2 mm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Height: 90 cm</Typography>
    <Typography variant="body2">Exterior Color: White</Typography>
    <Typography variant="body2">Interior Color: White</Typography>
    <Typography variant="body2">
      Aluminum Trim: Thickness 2 cm around the edge
    </Typography>
    <Typography variant="body2" sx={{ mt: 2 }}>
      Cable Grommet:
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="Without Brush"
      >
        <option value="Without Brush">Without Brush</option>
        <option value="With Brush">With Brush</option>
      </select>
    </Typography>

    {/* Units Dropdown */}
    <Typography variant="body2" sx={{ mt: 2 }}>
      Units:
      <select
        style={{
          padding: '0.5rem',
          marginLeft: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        defaultValue="1"
      >
        <option value="1">1 pcs</option>
        <option value="2">2 pcs</option>
        <option value="3">3 pcs</option>
        <option value="4">4 pcs</option>
      </select>
    </Typography>

{/* Unit 1 */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Unit 1
  </Typography>

  {/* Static Square Diameter */}
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Square Diameter: 10 cm</Typography>
  </Box>

  {/* Bottom to Top */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Bottom to Top:
    </Typography>
    <input
      type="range"
      min="20"
      max="50"
      defaultValue="35"
      style={{ marginRight: '10px', width: '60%' }}
      onChange={(e) => console.log(`Bottom to Top: ${e.target.value} cm`)}
    />
    <Typography variant="body2">35 cm</Typography>
  </Box>

  {/* Wall to Edge */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Wall to Edge:
    </Typography>
    <input
      type="range"
      min="0"
      max="10"
      defaultValue="0"
      style={{ marginRight: '10px', width: '60%' }}
      onChange={(e) => console.log(`Wall to Edge: ${e.target.value} cm`)}
    />
    <Typography variant="body2">0 cm</Typography>
  </Box>
</Box>
  
  {/* Lower Shelf Section */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Lower Shelf
  </Typography>

  {/* Include Lower Shelf */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Include Lower Shelf: Yes/No
    </Typography>
    <input
      type="checkbox"
      id="lower-shelf-toggle"
      defaultChecked={false}
      onChange={(e) =>
        console.log(
          `Include Lower Shelf: ${e.target.checked ? 'Yes' : 'No'}`
        )
      }
    />
  </Box>

  {/* With Cabinet Door */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      With Cabinet Door: Yes/No
    </Typography>
    <input
      type="checkbox"
      id="cabinet-door-toggle"
      defaultChecked={false}
      onChange={(e) =>
        console.log(
          `With Cabinet Door: ${e.target.checked ? 'Yes' : 'No'}`
        )
      }
    />
  </Box>

  {/* With Drawer */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      With Drawer: Yes/No
    </Typography>
    <input
      type="checkbox"
      id="drawer-toggle"
      defaultChecked={false}
      onChange={(e) =>
        console.log(`With Drawer: ${e.target.checked ? 'Yes' : 'No'}`)
      }
    />
  </Box>

  {/* With Box Below */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      With Box Below: Yes/No
    </Typography>
    <input
      type="checkbox"
      id="box-below-toggle"
      defaultChecked={false}
      onChange={(e) =>
        console.log(`With Box Below: ${e.target.checked ? 'Yes' : 'No'}`)
      }
    />
  </Box>
</Box>
</Box>

{/* Workbench 4 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Workbench 4
  </Typography>

  {/* Divided Toggle */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Divided:
    </Typography>
    <input
      type="checkbox"
      id="workbench-4-divided-toggle"
      defaultChecked={false}
      onChange={(e) =>
        console.log(`Workbench 4 Divided: ${e.target.checked ? 'Yes' : 'No'}`)
      }
    />
  </Box>

{/* Total Dimensions */}
<Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
  Total Dimensions:
</Typography>
<Box sx={{ ml: 2, mt: 1 }}>
  {/* Width Slider */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Width:
    </Typography>
    <input
      type="range"
      min="30"
      max="100"
      defaultValue="50"
      style={{ marginRight: '10px', width: '60%' }}
      onChange={(e) => console.log(`Width: ${e.target.value} cm`)}
    />
    <Typography variant="body2">50 cm</Typography>
  </Box>

  {/* Height Slider */}
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    <Typography variant="body2" sx={{ mr: 2 }}>
      Height:
    </Typography>
    <input
      type="range"
      min="60"
      max="120"
      defaultValue="90"
      style={{ marginRight: '10px', width: '60%' }}
      onChange={(e) => console.log(`Height: ${e.target.value} cm`)}
    />
    <Typography variant="body2">90 cm</Typography>
  </Box>

  {/* Placement TextField */}
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2">Placement:</Typography>
    <input
      type="text"
      id="placement-textfield"
      placeholder="Right side of Workbench 1"
      style={{
        width: '100%',
        padding: '0.5rem',
        marginTop: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
      onChange={(e) =>
        console.log(`Customized Placement: ${e.target.value}`)
      }
    />
  </Box>
</Box>

  {/* Upper Part */}
  <Typography variant="body2" sx={{ mt: 4, fontWeight: 'bold' }}>
    Upper Part
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 4 mm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Above the floor: 86 cm</Typography>
    <Typography variant="body2">Top Color: Grey</Typography>
    <Typography variant="body2">Bottom Color: Plywood</Typography>
    <Typography variant="body2">
      Aluminum Trim: Thickness 4 cm around the edge
    </Typography>

    {/* Cable Grommet Toggle */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Cable Grommet:
      </Typography>
      <input
        type="checkbox"
        id="cable-grommet-toggle"
        defaultChecked={false}
        onChange={(e) => {
          const grommetDetails = document.getElementById('cable-grommet-details');
          grommetDetails.style.display = e.target.checked ? 'block' : 'none';
          console.log(`Cable Grommet: ${e.target.checked ? 'Yes' : 'No'}`);
        }}
      />
    </Box>

    {/* Cable Grommet Details */}
    <Box id="cable-grommet-details" sx={{ display: 'none', ml: 2, mt: 2 }}>
      <Typography variant="body2">
        With Brush or Without Brush:
        <select
          style={{
            padding: '0.5rem',
            marginLeft: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
          defaultValue="Without Brush"
        >
          <option value="With Brush">With Brush</option>
          <option value="Without Brush">Without Brush</option>
        </select>
      </Typography>

{/* Units */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
    Units:
  </Typography>
  <Box sx={{ mt: 1 }}>
    <select
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '120px',
      }}
      defaultValue="1"
      onChange={(e) => console.log(`Selected Units: ${e.target.value} pcs`)}
    >
      <option value="1">1 pcs</option>
      <option value="2">2 pcs</option>
      <option value="3">3 pcs</option>
      <option value="4">4 pcs</option>
    </select>
  </Box>
</Box>

{/* Unit 1 */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
    Unit 1
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Diameter: 6 cm</Typography>
    <Typography variant="body2">Height: 2.5 cm</Typography>

    {/* Left to Right Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Left to Right:
      </Typography>
      <input
        type="range"
        min="10"
        max="50"
        defaultValue="19"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Left to Right: ${e.target.value} cm`)}
      />
      <Typography variant="body2">19 cm</Typography>
    </Box>

    {/* Wall to Edge Slider */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Wall to Edge:
      </Typography>
      <input
        type="range"
        min="0"
        max="10"
        defaultValue="2"
        style={{ marginRight: '10px', width: '60%' }}
        onChange={(e) => console.log(`Wall to Edge: ${e.target.value} cm`)}
      />
      <Typography variant="body2">2 cm</Typography>
    </Box>
  </Box>
</Box>
</Box>
</Box>


  {/* Right Part */}
  <Typography variant="body2" sx={{ mt: 4, fontWeight: 'bold' }}>
    Right Part: Connected to Workbench 1 Left Part
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    <Typography variant="body2">Thickness: 2 mm</Typography>
    <Typography variant="body2">Depth: 60 cm</Typography>
    <Typography variant="body2">Height: 86 cm</Typography>
    <Typography variant="body2">Exterior Color: White</Typography>
    <Typography variant="body2">Interior Color: White</Typography>
    <Typography variant="body2">
      Aluminum Trim: Thickness 2 cm around the edge
    </Typography>
  </Box>

  {/* Lower Shelf */}
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      Lower Shelf
    </Typography>

    {/* Include Lower Shelf */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Include Lower Shelf:
      </Typography>
      <input
        type="checkbox"
        id="lower-shelf-toggle"
        defaultChecked={false}
        onChange={(e) =>
          console.log(
            `Include Lower Shelf: ${e.target.checked ? 'Yes' : 'No'}`
          )
        }
      />
    </Box>

    {/* With Cabinet Door */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Cabinet Door:
      </Typography>
      <input
        type="checkbox"
        id="cabinet-door-toggle"
        defaultChecked={false}
        onChange={(e) =>
          console.log(
            `With Cabinet Door: ${e.target.checked ? 'Yes' : 'No'}`
          )
        }
      />
    </Box>

    {/* With Drawer */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Drawer:
      </Typography>
      <input
        type="checkbox"
        id="drawer-toggle"
        defaultChecked={false}
        onChange={(e) =>
          console.log(`With Drawer: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>

    {/* With Box Below */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 2 }}>
        With Box Below:
      </Typography>
      <input
        type="checkbox"
        id="box-below-toggle"
        defaultChecked={true}
        onChange={(e) =>
          console.log(`With Box Below: ${e.target.checked ? 'Yes' : 'No'}`)
        }
      />
    </Box>
  </Box>

{/* Box 1 */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Box 1
  </Typography>
  <Box sx={{ ml: 2, mt: 1 }}>
    {/* Cabinet Doors */}
    <Typography variant="body2" sx={{ mb: 2 }}>
      Cabinet Doors
    </Typography>

{/* Openable In */}
<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
  <Typography variant="body2" sx={{ mr: 2 }}>
    Openable In: Yes/No
  </Typography>
  <input
    type="checkbox"
    defaultChecked={true} // Default is Yes
    onChange={(e) =>
      console.log(`Openable In: ${e.target.checked ? 'Yes' : 'No'}`)
    }
  />
</Box>

    {/* Openable Out */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">Openable Out:</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <select
          style={{
            padding: '0.5rem',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '120px',
          }}
          defaultValue="Yes"
          onChange={(e) => console.log(`Openable Out: ${e.target.value}`)}
        >
          <option value="No">No</option>
          <option value="Yes">Yes With Slider</option>
        </select>
      </Box>
    </Box>

    {/* Additional Details */}
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">Locks: 2 pcs</Typography>
      <Typography variant="body2">Exterior Color: White</Typography>
      <Typography variant="body2">Interior Color: White</Typography>
      <Typography variant="body2">
        Aluminum Trim: Thickness 2 cm around the edge
      </Typography>
    </Box>
  </Box>
</Box>
</Box>



  {/* Navigation Buttons */}
  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
    <Button variant="outlined" disabled>
      Back
    </Button>
    <Button variant="contained" color="primary">
      Next
    </Button>
  </Box>
</Box>
</Box>
</Box>
</Box>
</Box>
</Box>
</Box>

  );
};

export default TrailerSpecification;