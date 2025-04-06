package com.aistudio.dietplan.controller;

import com.aistudio.dietplan.controller.dto.DietRequest;
import com.aistudio.dietplan.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/diet")
@CrossOrigin(origins = "http://localhost:3000")  // Adjust if your frontend runs on a different port
public class DietaryPlanController {

    @Autowired
    private AIService aiService;

    @PostMapping("/diet")
    public Map<String, String> getDietPlan(@RequestBody DietRequest request) {
        String prompt = String.format(
                "Create a dietary plan for a %s-year-old with %s. The person weighs %s kg, has a goal of %s, and a %s activity level. " +
                "Include suggestions for breakfast, lunch, dinner, and snacks.",
                request.getAge(), request.getCondition(), request.getWeight(), request.getGoal(), request.getActivityLevel()
        );

        String recommendation = aiService.generateDietPlan(prompt);

        Map<String, String> response = new HashMap<>();
        response.put("recommendation", recommendation);
        return response;
    }
}
