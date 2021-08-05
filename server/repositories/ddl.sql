CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	name varchar NULL,
	profile_image_url varchar NULL,
	external_id  varchar NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	deleted_at timestamp NULL
);

CREATE TABLE public.feedbacks (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_praised_id varchar NOT NULL,
  user_id varchar NOT NULL,
  message varchar NOT NULL,
  pizza int not null default 1,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	deleted_at timestamp NULL
);

INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('35c92bd1-d547-40e1-ab38-43884c1932b5', 'Gabriel Fonseca', 'https://ca.slack-edge.com/T04L38A0J-U04L38A18-7a09134b6717-512', 'U04L38A18', '2021-07-30 00:33:30.859', '2021-07-30 00:33:30.859', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('e07b2baa-4b01-4ede-b551-e20c7a623323', 'Danillo Santos', 'https://ca.slack-edge.com/T04L38A0J-U04LQMAFH-a488ec8923fb-512', 'U04LQMAFH', '2021-07-30 00:36:45.786', '2021-07-30 00:36:45.786', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('3153de59-3bbd-498c-9d5e-479fc717b703', 'Claudio', 'https://ca.slack-edge.com/T04L38A0J-U07QLF0BH-8b88c3971d1a-512', 'U07QLF0BH', '2021-07-30 00:36:53.812', '2021-07-30 00:36:53.812', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('a1098286-9e76-47b8-80b1-514aefb771a6', 'Gabe', 'https://ca.slack-edge.com/T04L38A0J-U07V496HY-fa0351e42142-512', 'U07V496HY', '2021-07-30 00:36:58.694', '2021-07-30 00:36:58.694', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('808dd2d3-35c1-4e3d-9ed0-8851f0f5a1e2', 'Luizero', 'https://ca.slack-edge.com/T04L38A0J-U8WC0HKL3-c56a95cfb242-512', 'U8WC0HKL3', '2021-07-30 00:37:11.921', '2021-07-30 00:37:11.921', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('4e9828ab-7c5e-4956-bde7-15735f9ff314', 'Alexia', 'https://ca.slack-edge.com/T04L38A0J-UB7RA1N5U-bd7132703487-512', 'UB7RA1N5U', '2021-07-30 00:37:22.801', '2021-07-30 00:37:22.801', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('9be29fa3-5d51-4f65-8f94-3a58c10848db', 'Rabelo', 'https://ca.slack-edge.com/T04L38A0J-ULAFKSVJN-56aa84b3d31e-512', 'ULAFKSVJN', '2021-07-30 00:37:26.917', '2021-07-30 00:37:26.917', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('27042058-a2d7-4afe-81e2-5d81be0797b6', 'Andrew', 'https://ca.slack-edge.com/T04L38A0J-UMF07B5ED-1e887ed15350-512', 'UMF07B5ED', '2021-07-30 00:37:33.925', '2021-07-30 00:37:33.925', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('f9aab42b-ee03-4c02-9073-6b143f7128c7', 'Laurencio', 'https://ca.slack-edge.com/T04L38A0J-UPXQB0TQW-a288a4e898f6-512', 'UPXQB0TQW', '2021-07-30 00:37:40.003', '2021-07-30 00:37:40.003', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('d295f373-14f1-4432-bc4a-35f87ac41e5e', 'Victor', 'https://ca.slack-edge.com/T04L38A0J-U0279706T6Y-ed8ebfffbc11-192', 'US59TCY2D', '2021-07-30 00:37:49.034', '2021-07-30 00:37:49.034', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('f5c5f90a-eb03-4c0d-8d04-e744dea42f1d', 'Leandro', 'https://ca.slack-edge.com/T04L38A0J-USKDMMMA5-51dfbbc9f2bb-512', 'USKDMMMA5', '2021-07-30 00:37:57.613', '2021-07-30 00:37:57.613', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('d992fa4d-377c-455b-b555-a5e8adbd8dff', 'Yasmin', 'https://ca.slack-edge.com/T04L38A0J-U01CAN4NBKN-659478429da5-512', 'U01CAN4NBKN', '2021-07-30 00:38:04.630', '2021-07-30 00:38:04.630', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('776e832c-b453-4db4-a764-fa42eaffbc12', 'Danilo Affonso', 'https://ca.slack-edge.com/T04L38A0J-U01DQA0SEK0-4309e1d9c262-512', 'U01DQA0SEK0', '2021-07-30 00:38:12.618', '2021-07-30 00:38:12.618', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('97b4a2aa-2d25-4000-a03a-85c47916c2b0', 'Eder', 'https://ca.slack-edge.com/T04L38A0J-U01EXAU66SU-9588250edf39-512', 'U01EXAU66SU', '2021-07-30 00:38:20.559', '2021-07-30 00:38:20.559', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('e8b7bcbb-a33c-45e3-9bf1-638e8d64ecc6', 'Rodrigo Prior', 'https://ca.slack-edge.com/T04L38A0J-UB55MCTPH-9ee6bee5b1dc-512', 'UB55MCTPH', '2021-07-30 00:38:26.113', '2021-07-30 00:38:26.113', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('fd889415-0e61-4f2c-9681-ecea2e8e2fcc', 'Juan', 'https://ca.slack-edge.com/T04L38A0J-U01LJEQHZD1-140bd9a40f00-512', 'U01LJEQHZD1', '2021-07-30 00:38:31.997', '2021-07-30 00:38:31.997', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('4d601aab-d735-4fa0-ba77-314285a0dea1', 'Ryan Lopes', 'https://ca.slack-edge.com/T04L38A0J-U01MQBFDYJV-0e15f4664d28-512', 'U01MQBFDYJV', '2021-07-30 00:38:38.623', '2021-07-30 00:38:38.623', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('742eca55-c096-41ec-b6f2-1abd84f5bd21', 'Kauê Livio', 'https://ca.slack-edge.com/T04L38A0J-U01GAQ4BZD0-9f6298d394a0-512', 'U01GAQ4BZD0', '2021-07-30 00:38:43.826', '2021-07-30 00:38:43.826', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('2def4f32-7cf3-45b1-bd03-d3b2a7f1c599', 'Isnack Souza', 'https://ca.slack-edge.com/T04L38A0J-U01N508S10T-72ba43ddc1ac-512', 'U01N508S10T', '2021-07-30 00:38:49.778', '2021-07-30 00:38:49.778', NULL);
INSERT INTO public.users (id, "name", profile_image_url, external_id, created_at, updated_at, deleted_at) VALUES('b2e8731c-592f-4765-ba19-e9e4a3866e06', 'Antonio', 'https://ca.slack-edge.com/T04L38A0J-U01NPJBKYKY-c4faa8e06330-512', 'U01NPJBKYKY', '2021-07-30 00:38:55.892', '2021-07-30 00:38:55.892', NULL);
