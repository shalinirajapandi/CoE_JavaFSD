package myproject;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class RoomScheduler {
    private Map<String, MeetingRoom> rooms;

    public RoomScheduler() {
        this.rooms = new HashMap<>();
    }

    public void addMeetingRoom(MeetingRoom room) {
        rooms.put(room.getRoomId(), room);
        System.out.println("Room added: " + room.getRoomName() + ", ID: " + room.getRoomId());
    }

    public String bookRoom(String roomId, EnumSet<RoomFeature> requiredFeatures) {
        if (rooms.containsKey(roomId)) {
            MeetingRoom room = rooms.get(roomId);
            if (room.getFeatures().containsAll(requiredFeatures)) {
                System.out.println("Room " + roomId + " booked successfully.");
                return "Room " + roomId + " booked successfully.";
            } else {
                System.out.println("Room " + roomId + " does not meet the required features.");
                return "Room " + roomId + " does not meet the required features.";
            }
        }
        System.out.println("Room ID " + roomId + " not found.");
        return "Room ID " + roomId + " not found.";
    }

    public List<String> listAvailableRooms(EnumSet<RoomFeature> requiredFeatures) {
        List<String> availableRooms = new ArrayList<>();
        for (MeetingRoom room : rooms.values()) {
            if (room.getFeatures().containsAll(requiredFeatures)) {
                availableRooms.add(room.getRoomName());
            }
        }
        System.out.println("Available rooms with " + requiredFeatures + ": " + availableRooms);
        return availableRooms;
    }
}
