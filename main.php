<?php
function lecturaDatos(){
  $data_file = fopen('./data-1.json', 'r'); 
  $data = fread($data_file, filesize('./data-1.json')); 
  $data = json_decode($data, true); 
  fclose($data_file); 
  return ($data);
};


function getCiudad($getData){ 
  $getCities = Array(); 
  foreach ($getData as $cities => $city) { 
    if(in_array($city['Ciudad'], $getCities)){ 

    }else{
      array_push($getCities, $city['Ciudad']); 
    }
  }
  echo json_encode($getCities); 
}

function getTipo($getData){ 
  $getTipo = Array(); 
  foreach ($getData as $tipos => $tipo) { 
    if(in_array($tipo['Tipo'], $getTipo)){ 
      
    }else{
      array_push($getTipo, $tipo['Tipo']); 
    }
  }
  echo json_encode($getTipo); 
}
?>