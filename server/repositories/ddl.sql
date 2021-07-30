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