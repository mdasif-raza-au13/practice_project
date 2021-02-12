import express from "express";
const router = express.Router();
import Subscriber from '../models/subs.js';

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (error) {
    res.status(500).json({ message: error})
  }
});

// Getting One
router.get('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    console.log(subscriber);
    if (subscriber) {return res.json({ subscriber }) }
    else { return res.json({ message: `Subscriber with ID ${req.params.id} not found` }) }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
});

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (error) {
    res.status(400).json({ message: error })
  }
});

// Updating one
router.patch('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber) {
      if (req.body.name != null) {
        subscriber.name = req.body.name
      }
      if (req.body.subscribedToChannel != null) {
        subscriber.subscribedToChannel = req.body.subscribedToChannel
      }
    const updatedSubscriber = await subscriber.save()
    return res.json(updatedSubscriber)
    }else{res.status(404).json({ message: 'Cannot find subscriber' })}
  } catch (error) {
    res.status(500).json({ message: error})
  }
});

// Deleting One
router.delete('/:id',async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if(subscriber){
      await subscriber.remove();
      res.json({message: 'Subscriber Deleted'})
    }else{res.status(404).json({ message: 'Cannot find subscriber' })}
  } catch (error) {
    res.status(500).json({ message: error})
  }
});


export default router;