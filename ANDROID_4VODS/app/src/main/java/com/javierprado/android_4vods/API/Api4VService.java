package com.javierprado.android_4vods.API;

import com.javierprado.android_4vods.models.Iniciative;
import com.javierprado.android_4vods.models.IniciativeCard;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;

public interface Api4VService {
    @GET("iniciatives")
    Call<List<IniciativeCard>> getIniciatives();
}
