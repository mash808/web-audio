/*
    TODO:
    [x] play a sine wave oscillator
    [x] play and pause the oscillator 
    [] stop clicking sound when suspending audio suddenly
    [] change oscillator type with a UI dropdown or knob
*/

import { Button } from "@nextui-org/react"

function App() {
  const audio = new AudioContext()
  
  const osc = audio.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(440, audio.currentTime)
  
  let gain = audio.createGain()
  gain.gain.setValueAtTime(0.05, audio.currentTime)
  
  // use this gain node to fade in and out when the audio is toggled, 
  // to prevent the "clicking" sound of the speaker resetting back into place too quickly 
  let speakerResetFade = audio.createGain()
  speakerResetFade.gain.setValueAtTime(1, audio.currentTime)
  
  osc.connect(gain)
  gain.connect(speakerResetFade)
  speakerResetFade.connect(audio.destination)
  osc.start()

  const toggleAudio = () => {
    if (audio.state === 'suspended') {
      audio.resume()
    } else {
      // setTimeout(() => {
      //   speakerResetFade.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 1000)
      // }, 1000);
      audio.suspend()
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen space-y-4'>
      <h1 className="text-3xl font-medium">Audio Web App</h1>

      <div className="flex flex-row">
        <Button 
          className="text-slate-500 font-semibold" 
          onClick={toggleAudio}>
            Toggle Oscillator 
        </Button>
        {/* <Dropdown>
          <Dropdown.Button className="text-slate-500">
            Type
          </Dropdown.Button>
          <Dropdown.Menu
            disallowEmptySelection
            selectionMode="single"  
          >
            <Dropdown.Item key='sine'>Sine</Dropdown.Item>
            <Dropdown.Item key='triangle'>Triangle</Dropdown.Item>
            <Dropdown.Item key='sawtooth'>Sawtooth</Dropdown.Item>
            <Dropdown.Item key='square'>Square</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
    </div>
  )
}

export default App
