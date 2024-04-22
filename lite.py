import subprocess

# Define the command as a list of strings
command = [
    'tflite_convert',
    '--keras_model_file=assets/trained_plant_disease_model.keras',
    '--output_file=assets/trained.tflite'
]

# Execute the command
try:
    subprocess.run(command, check=True)
    print("TensorFlow Lite model conversion successful!")
except subprocess.CalledProcessError as e:
    print("Error converting TensorFlow Lite model:", e)
