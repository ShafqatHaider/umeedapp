import express from 'express';
import auth from '../middleware/auth.js';
import Profile from '../models/Profile.js';

const router = express.Router();

// Create or Update Profile
router.post('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { ...req.body, user: req.user.id },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate('user', 'name email');

    // Update user's profileCompleted status
    await User.findByIdAndUpdate(req.user.id, { profileCompleted: true });

    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get User Profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', 'name email');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Profiles for Matching
router.get('/matches', auth, async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.user.id });
    
    if (!userProfile) {
      return res.status(404).json({ message: 'Please complete your profile first' });
    }

    const profiles = await Profile.find({
      user: { $ne: req.user.id },
      'basicInfo.gender': { $ne: userProfile.basicInfo.gender },
      isVerified: true
    }).populate('user', 'name email').limit(20);

    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;